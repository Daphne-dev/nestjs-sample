import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from 'library/guards/auth/jwt/type/token.type';

export const JwtUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    const tokenPayload = request.user;

    return { userId: tokenPayload.userId ?? null };
  },
);
