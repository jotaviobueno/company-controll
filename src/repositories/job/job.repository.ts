import { Injectable } from '@nestjs/common';
import { IJobRepository } from './ijob.repository';
import { PrismaService } from 'src/db/prisma.service';
import {
  CreateJobInput,
  PaginationOptionsInput,
  UpdateJobInput,
} from 'src/domain/dtos';
import { JobEntity } from 'src/domain/entities';

@Injectable()
export class JobRepository implements Partial<IJobRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateJobInput): Promise<JobEntity> {
    return this.prismaService.job.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<JobEntity[]> {
    return this.prismaService.job.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(id: string): Promise<JobEntity> {
    return this.prismaService.job.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update({ id, ...updateDto }: UpdateJobInput): Promise<JobEntity> {
    return this.prismaService.job.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<JobEntity> {
    return this.prismaService.job.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
