import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AccessEntity } from 'src/domain/entities';
import { CreateAccessInput } from 'src/domain/dtos';
import { AccessHandlerUseCase } from './use-cases';

@Resolver(() => AccessEntity)
export class AccessResolver {
  constructor(private readonly accessHandlerUseCase: AccessHandlerUseCase) {}

  @Mutation(() => AccessEntity)
  createAccess(
    @Args('createAccessInput') createAccessInput: CreateAccessInput,
  ) {
    return this.accessHandlerUseCase.execute(createAccessInput);
  }
}
