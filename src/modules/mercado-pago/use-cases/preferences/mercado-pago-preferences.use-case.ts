import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { MercadoPago } from 'src/domain/utils';

@Injectable()
export class MercadoPagoPreferencesUseCase implements IBaseUseCase<void, any> {
  constructor(private readonly mercadoPago: MercadoPago) {}

  execute(data: void): Promise<any> {
    return this.mercadoPago.preferences();
  }
}
