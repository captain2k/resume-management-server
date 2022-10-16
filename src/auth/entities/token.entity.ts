import { Roles } from '@prisma/client';

export class Token {
  accessToken: string;
  refreshToken: string;
}

export class TokenPayload {
  id: string;
  role: Roles;
}
