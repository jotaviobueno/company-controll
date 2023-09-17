import { Injectable } from '@nestjs/common';
import { IAddressRepository } from './iaddress.repository';

@Injectable()
export class AddressRepository extends IAddressRepository {}
