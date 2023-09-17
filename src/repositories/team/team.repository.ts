import { Injectable } from '@nestjs/common';
import { ITeamRepository } from './iteam.repository';

@Injectable()
export class TeamRepository extends ITeamRepository {}
