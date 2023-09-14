import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoController } from './mercado-pago.controller';
import { mercadoPagoModuleMock } from './mercado-pago.module';

describe('MercadoPagoController', () => {
  let controller: MercadoPagoController;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule(mercadoPagoModuleMock).compile();

    controller = moduleRef.get<MercadoPagoController>(MercadoPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    moduleRef.close();
  });
});
