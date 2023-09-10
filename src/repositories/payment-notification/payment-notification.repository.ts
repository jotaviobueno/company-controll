import { Injectable } from '@nestjs/common';
import { IPaymentNotificationRepository } from './ipayment-notification.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePaymentNotificationDto } from 'src/domain/dtos';
import { PaymentNotificationEntity } from 'src/domain/entities';

@Injectable()
export class PaymentNotificationRepository
  implements Partial<IPaymentNotificationRepository>
{
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createDto: CreatePaymentNotificationDto,
  ): Promise<PaymentNotificationEntity> {
    return this.prismaService.paymentNotification.create({
      data: {
        ...createDto,
      },
    });
  }

  findByPaymentId(paymentId: string): Promise<PaymentNotificationEntity> {
    return this.prismaService.paymentNotification.findFirst({
      where: {
        paymentId,
      },
    });
  }
}
