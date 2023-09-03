import { HttpException, HttpStatus } from '@nestjs/common';
import { Credentials } from 'google-auth-library';
import { google } from 'googleapis';

export async function googleGetUser(token: Credentials) {
  const oauth2 = google.oauth2('v2');

  const { data: tokenData, statusText: tokenStatus } = await oauth2.tokeninfo({
    access_token: token.access_token,
  });

  if (!tokenData) throw new HttpException(tokenStatus, HttpStatus.BAD_REQUEST);

  const { data: userData, statusText: userStatus } = await oauth2.userinfo.get({
    oauth_token: token.access_token,
  });

  if (!userData) throw new HttpException(userStatus, HttpStatus.BAD_REQUEST);

  return userData;
}
