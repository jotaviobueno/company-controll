import { Injectable } from '@nestjs/common';
import { IPersonAddressRepository } from './iperson-address.repository';

@Injectable()
export class PersonAddressRepository extends IPersonAddressRepository {}
