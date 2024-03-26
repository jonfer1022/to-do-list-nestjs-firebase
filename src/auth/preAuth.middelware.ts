import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { FirebaseAdmin } from '../common/firebaseAdmin.setup';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { RequestAuth } from 'src/common/types';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  constructor(private admin: FirebaseAdmin) {}

  use(req: RequestAuth, res: Response, next: (error?: any) => void) {
    const token = req.headers.authorization;
    const app = this.admin.setup();
    const checkRevoked = true;
    if (token != null && token != '') {
      app
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''), checkRevoked)
        .then((decodedToken: DecodedIdToken) => {
          req.user = {
            email: decodedToken.email,
            uid: decodedToken.uid,
          };
          next();
        })
        .catch((error: any) => {
          console.log('-----> ~ PreAuthMiddleware ~ error:', error);
          this.accessDenied(req.url, res);
        });
    } else {
      this.accessDenied(req.url, res);
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      message: 'Access Denied',
      error: 'Forbidden',
      path: url,
      timestamp: new Date().toISOString(),
    });
  }
}
