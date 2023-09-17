import { Field, ObjectType } from '@nestjs/graphql';
import { PaymentNotification } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PaymentNotificationEntity
  extends IBaseEntity
  implements PaymentNotification
{
  @Field({ nullable: true })
  resource: string | null;

  @Field({ nullable: true })
  topic: string | null;

  @Field({ nullable: true })
  action: string | null;

  @Field({ nullable: true })
  apiVersion: string | null;

  @Field({ nullable: true })
  transferId: string | null;

  @Field({ nullable: true })
  genericId: string | null;

  @Field({ nullable: true })
  paymentId: string | null;

  @Field({ nullable: true })
  mercadoPagoUserId: string | null;

  @Field(() => Boolean, { nullable: true })
  liveMode: boolean | null;

  @Field({ nullable: true })
  type: string | null;

  deletedAt: Date | null;
}
