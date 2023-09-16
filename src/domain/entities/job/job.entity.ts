import { Field, ObjectType } from '@nestjs/graphql';
import { Job, JobStatus } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';
import { JOB_STATUS } from 'src/domain/enums';

@ObjectType()
export class JobEntity extends IBaseEntity implements Job {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string | null;

  @Field(() => JOB_STATUS)
  status: JobStatus;

  @Field(() => Date, { nullable: true })
  expiresAt: Date | null;

  deletedAt: Date | null;
}
