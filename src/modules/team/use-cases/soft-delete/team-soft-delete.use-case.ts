import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { TeamFindOneUseCase } from '../find-one';
import { ITeamRepository } from 'src/repositories/team';

@Injectable()
export class TeamSoftDeleteUseCase implements IBaseUseCase<string, boolean> {
  constructor(
    private readonly teamFindOneUseCase: TeamFindOneUseCase,
    private readonly teamRepository: ITeamRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const team = await this.teamFindOneUseCase.execute(data);

    const remove = await this.teamRepository.softDelete(team.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
