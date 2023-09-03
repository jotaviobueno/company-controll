import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { ACCESS_PROVIDER } from 'src/domain/enums';
import { googleAuth, googleGetUser } from 'src/domain/utils';

@Injectable()
export class GoogleFindUseByCodeUseCase implements IBaseUseCase<string, any> {
  async execute(data: string): Promise<any> {
    const credentials = await googleAuth(data);

    const user = await googleGetUser(credentials);

    return {
      ...user,
      name: user.family_name,
      username: user.given_name,
      id: user.id,
      provider: ACCESS_PROVIDER.GOOGLE,
    };
  }
}
