import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { AccessFindByCodeOrUpdateUseCase } from '../find-by-code-or-update';
import { IAccessRepository } from 'src/repositories/access';
import { PersonCreateUseCase } from 'src/modules/person/use-cases';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessCreateUseCase implements IBaseUseCase<any, string> {
  constructor(
    private readonly accessFindByCodeOrUpdateUseCase: AccessFindByCodeOrUpdateUseCase,
    private readonly personCreateUseCase: PersonCreateUseCase,
    private readonly accessRepository: IAccessRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ provider, token, ...user }: any) {
    let access = await this.accessFindByCodeOrUpdateUseCase.execute(user.id);

    if (!access) {
      access = await this.accessRepository.create({
        token,
        provider,
      });

      await this.personCreateUseCase.execute({
        ...(user.picture && { avatarUrl: user.picture }),
        ...user,
        accessId: access.id,
      });
    }

    return this.jwtService.sign({
      sub: access.id,
    });
  }
}
