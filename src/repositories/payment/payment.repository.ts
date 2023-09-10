import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from './ipayment.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePaymentDto } from 'src/domain/dtos';
import { PaymentEntity } from 'src/domain/entities';

@Injectable()
export class PaymentRepository implements Partial<IPaymentRepository> {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: CreatePaymentDto): Promise<PaymentEntity> {
    return this.prismaService.payment.create({
      data: {
        ...createDto,
      },
    });
  }

  findByPaymentId(paymentId: string): Promise<PaymentEntity> {
    return this.prismaService.payment.findFirst({
      where: {
        paymentId,
      },
    });
  }
}
