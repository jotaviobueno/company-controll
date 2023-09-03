import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { randomUUID } from 'crypto';
import { GqlExecutionContext } from '@nestjs/graphql';

function logGraphql(host = '', query = '', reqId = '', duration?: number) {
  let message = `from: ${host} | query: ${query} | reqId: ${reqId} `;
  if (duration) message += `| time: ${duration}ms`;
  return message;
}

function logHttp(
  host = '',
  method = '',
  url = '',
  reqId = '',
  duration?: number,
) {
  let message = `from: ${host} | method: ${method} | url: ${url} | reqId: ${reqId} `;
  if (duration) message += `| time: ${duration}ms`;
  return message;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const reqId = randomUUID();

    if (context.getType<'graphql' | 'http'>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const { operation, fieldName } = gqlContext.getInfo();
      const host = gqlContext?.getContext?.()?.req.headers.host;
      const operationName = operation.name?.value || '';
      const query = [operationName, fieldName].filter((v) => v).join(' - ');
      const logger = new Logger();

      logger.debug(logGraphql(host, query, reqId));
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - startTime;
          logger.debug(logGraphql(host, query, reqId, duration));
        }),
      );
    }

    if (context.getType<'graphql' | 'http'>() === 'http') {
      const logger = new Logger();

      const { headers, method, url } = context.switchToHttp().getRequest();
      const { host } = headers;

      logger.debug(logHttp(host, method, url, reqId));
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - startTime;
          logger.debug(logHttp(host, method, url, reqId, duration));
        }),
      );
    }

    return next.handle();
  }
}
