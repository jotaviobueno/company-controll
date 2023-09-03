import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccessService } from './access.service';
import { Access } from './entities/access.entity';
import { CreateAccessInput } from './dto/create-access.input';
import { UpdateAccessInput } from './dto/update-access.input';

@Resolver(() => Access)
export class AccessResolver {
  constructor(private readonly accessService: AccessService) {}

  @Mutation(() => Access)
  createAccess(@Args('createAccessInput') createAccessInput: CreateAccessInput) {
    return this.accessService.create(createAccessInput);
  }

  @Query(() => [Access], { name: 'access' })
  findAll() {
    return this.accessService.findAll();
  }

  @Query(() => Access, { name: 'access' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accessService.findOne(id);
  }

  @Mutation(() => Access)
  updateAccess(@Args('updateAccessInput') updateAccessInput: UpdateAccessInput) {
    return this.accessService.update(updateAccessInput.id, updateAccessInput);
  }

  @Mutation(() => Access)
  removeAccess(@Args('id', { type: () => Int }) id: number) {
    return this.accessService.remove(id);
  }
}
