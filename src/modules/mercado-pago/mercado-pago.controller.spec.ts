import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoController } from './mercado-pago.controller';
import { mercadoPagoModuleMock } from './mercado-pago.module';

describe('MercadoPagoController', () => {
  let controller: MercadoPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      mercadoPagoModuleMock,
    ).compile();

    controller = module.get<MercadoPagoController>(MercadoPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
