import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  MercadoPagoHandlerUseCase,
  MercadoPagoPreferencesUseCase,
} from './use-cases';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoPreferencesUseCase: MercadoPagoPreferencesUseCase,
    private readonly mercadoPagoHandlerUseCase: MercadoPagoHandlerUseCase,
  ) {}

  @Post()
  create(@Body() body: any, @Query() query: any) {
    console.log(body, query);

    return this.mercadoPagoHandlerUseCase.execute({ ...body, ...query });
  }

  @Get('preferences')
  preferences() {
    return this.mercadoPagoPreferencesUseCase.execute();
  }

  // @Get(':id')
  // findPayment(@Param('id') id: string) {
  //   return this.mercadopagoService.findPayment(id);
  // }
}
