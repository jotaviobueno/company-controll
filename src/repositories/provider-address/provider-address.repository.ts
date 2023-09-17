import { Injectable } from '@nestjs/common';
import { IProviderAddressRepository } from './iprovider-address.repository';

@Injectable()
export class ProviderAddressRepository extends IProviderAddressRepository {}
