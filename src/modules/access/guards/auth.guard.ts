import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { environment } from '../../../config/environment';
import { PersonFindByAccessIdUseCase } from 'src/modules/person/use-cases';
import { AccessFindOneUseCase } from '../use-cases';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly accessFindOneUseCase: AccessFindOneUseCase,
    private readonly personFindByAccessIdUseCase: PersonFindByAccessIdUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'public',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = GqlExecutionContext.create(context).getContext();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token)
      throw new HttpException('invalid session', HttpStatus.BAD_REQUEST);

    try {
      const payload: { sub: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: environment.JWT_SECRET,
        },
      );

      const access = await this.accessFindOneUseCase.execute(payload.sub);

      request['person'] = await this.personFindByAccessIdUseCase.execute(
        access.id,
      );
    } catch (e) {
      Logger.debug('FAILED TO AUTH', e.message);

      throw new HttpException('Failed to auth', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
