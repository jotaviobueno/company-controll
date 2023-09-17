import { Injectable } from '@nestjs/common';
import { ICustomerAddressRepostiroy } from './icustomer-address.repository';

@Injectable()
export class CustomerAddressRepository extends ICustomerAddressRepostiroy {}
