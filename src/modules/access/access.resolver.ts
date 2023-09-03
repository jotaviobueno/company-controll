import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AccessEntity } from 'src/domain/entities';
import { CreateAccessInput } from 'src/domain/dtos';
import { AccessHandler } from './use-cases';

@Resolver(() => AccessEntity)
export class AccessResolver {
  constructor(private readonly accessHandler: AccessHandler) {}

  @Mutation(() => AccessEntity)
  createAccess(
    @Args('createAccessInput') createAccessInput: CreateAccessInput,
  ) {
    return this.accessHandler.execute(createAccessInput);
  }
}
