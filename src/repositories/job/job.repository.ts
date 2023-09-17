import { Injectable } from '@nestjs/common';
import { IJobRepository } from './ijob.repository';

@Injectable()
export class JobRepository extends IJobRepository {}
