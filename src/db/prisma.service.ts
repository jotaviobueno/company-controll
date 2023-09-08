import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PersonEntity } from 'src/domain/entities';
import { firstLetterToLowerCase } from 'src/domain/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      await this.$transaction(
        async (tx) => {
          await this.handleLog(params, tx);
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 550000, // default: 5000
        },
      );

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  private async handleLog(params: Prisma.MiddlewareParams, tx: any) {
    if (
      (!params.runInTransaction && params.action === 'create') ||
      params.action === 'createMany'
    ) {
      await tx.log.create({
        data: {
          modelName: params.model,
          action: params.action,
          newValue: params.args['data'],
        },
      });
    }

    if (params.action === 'update' && !params.runInTransaction) {
      const model = firstLetterToLowerCase(params.model);

      const oldValue = await ((tx as any)[model] as any).findUnique({
        where: {
          id: params.args.where.id,
        },
      });

      const personId =
        model != 'person' && oldValue?.personId
          ? await tx.person
              .findUnique({
                where: {
                  id: oldValue?.personId,
                },
              })
              .then((person: PersonEntity) => person.id)
          : oldValue.id;

      await tx.log.create({
        data: {
          modelName: params.model,
          action: 'update',
          personId,
          oldValue: oldValue,
          newValue: params.args['data'],
        },
      });
    }
  }
}
