import { BadRequestException, Injectable } from '@nestjs/common';
import { FirebaseAdmin } from '../common/firebaseAdmin.setup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class AuthService {
  private admin: FirebaseAdmin;

  constructor() {
    this.admin = new FirebaseAdmin();
  }

  async createUser(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    try {
      const app = this.admin.setup();
      await app.auth().createUser({
        email,
        password,
      });
      return await this.login(email, password);
    } catch (error) {
      console.log('-----> ~ AuthService ~ createUser ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    try {
      const userSignIn = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      const token = await userSignIn.user.getIdToken();
      const refreshToken = userSignIn.user.refreshToken;
      return { token, refreshToken };
    } catch (error) {
      console.log('-----> ~ AuthService ~ login ~ error:', error);
      throw new BadRequestException('Wrong email or password');
    }
  }

  async logout(uid: string) {
    try {
      const app = this.admin.setup();
      app
        .auth()
        .revokeRefreshTokens(uid)
        .then(() => {
          return app.auth().getUser(uid);
        })
        .then((userRecord) => {
          return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
        })
        .then((timestamp) => {
          console.log(`Tokens revoked at: ${timestamp}`);
        });
    } catch (error) {
      console.log('-----> ~ AuthService ~ logout ~ error:', error);
      throw new BadRequestException('logout error');
    }
  }
}
