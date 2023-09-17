import { Injectable } from '@nestjs/common';
import { IProviderRepository } from './iprovider.repository';

@Injectable()
export class ProviderRepository extends IProviderRepository {}
