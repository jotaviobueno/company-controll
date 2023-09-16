import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateTeamInput } from 'src/domain/dtos';
import { TeamEntity } from 'src/domain/entities';
import { CompanyFindOneUseCase } from 'src/modules/company/use-cases';
import { ITeamRepository } from 'src/repositories/team';

@Injectable()
export class TeamCreateUseCase
  implements IBaseUseCase<CreateTeamInput, TeamEntity>
{
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly companyFindOneUseCase: CompanyFindOneUseCase,
  ) {}

  async execute(data: CreateTeamInput): Promise<TeamEntity> {
    const company = await this.companyFindOneUseCase.execute(data.companyId);

    const team = await this.teamRepository.create({
      ...data,
      companyId: company.id,
    });

    return team;
  }
}
