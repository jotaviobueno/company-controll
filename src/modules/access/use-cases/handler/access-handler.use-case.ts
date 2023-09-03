import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAccessInput } from 'src/domain/dtos';
import { ACCESS_PROVIDER } from 'src/domain/enums';
import { GoogleFindUseByCodeUseCase } from 'src/modules/google/use-cases';
import { AccessCreateUseCase } from '../create';

@Injectable()
export class AccessHandler implements IBaseUseCase<CreateAccessInput, string> {
  constructor(
    private readonly googleFindUseByCodeUseCase: GoogleFindUseByCodeUseCase,
    private readonly accessCreateUseCase: AccessCreateUseCase,
  ) {}

  async execute(data: CreateAccessInput): Promise<string> {
    switch (data.provider) {
      case ACCESS_PROVIDER.GOOGLE:
        const user = await this.googleFindUseByCodeUseCase.execute(data.code);

        return this.accessCreateUseCase.execute(user);
    }
  }
}
