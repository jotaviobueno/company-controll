import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoController } from './mercado-pago.controller';
import { MercadoPagoService } from './mercado-pago.service';

describe('MercadoPagoController', () => {
  let controller: MercadoPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoPagoController],
      providers: [MercadoPagoService],
    }).compile();

    controller = module.get<MercadoPagoController>(MercadoPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
