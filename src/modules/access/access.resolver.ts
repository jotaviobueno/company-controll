import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { PersonEntity } from 'src/domain/entities';
import { CreateAccessInput } from 'src/domain/dtos';
import { AccessHandlerUseCase } from './use-cases';
import { ACCESS_PROVIDER } from 'src/domain/enums';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards';

@Resolver()
export class AccessResolver {
  constructor(private readonly accessHandlerUseCase: AccessHandlerUseCase) {}

  @Mutation(() => String)
  createAccess(
    @Args('createAccessInput') createAccessInput: CreateAccessInput,
  ) {
    return this.accessHandlerUseCase.execute(createAccessInput);
  }

  @Mutation(() => String)
  createAccessForDev() {
    return this.accessHandlerUseCase.execute({
      provider: ACCESS_PROVIDER.ACCESS_DEV,
      token: '61f7e48f0c651345677b7775',
    });
  }

  @Query(() => PersonEntity)
  @UseGuards(AuthGuard)
  whoAmI(@Context('person') person: PersonEntity) {
    return person;
  }
}
