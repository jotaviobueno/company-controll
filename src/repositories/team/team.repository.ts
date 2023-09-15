import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateTeamInput } from 'src/domain/dtos';
import { ITeamRepository } from './iteam.repository';
import { TeamEntity } from 'src/domain/entities';

@Injectable()
export class TeamRepository implements Partial<ITeamRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreateTeamInput): Promise<TeamEntity> {
    return this.prismaService.team.create({
      data: {
        ...createDto,
        deletedAt: null,
      },
    });
  }
}
