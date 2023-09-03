import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { environment } from '../../../config/environment';

export const oauth2Client = new google.auth.OAuth2(
  environment.GOOGLE_CLIENT_ID,
  environment.GOOGLE_CLIENT_SECRET,
  environment.GOOGLE_REDIRECT_URL,
);

export function generateAuthUrl() {
  return oauth2Client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    include_granted_scopes: true,
  });
}

export async function googleAuth(code: string) {
  const response = await oauth2Client.getToken(code).catch((error: Error) => {
    return error;
  });

  if (response instanceof Error) {
    Logger.debug('GOOGLE_AUTH_FAILED', response.message);

    throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
  }

  return response.tokens;
}
