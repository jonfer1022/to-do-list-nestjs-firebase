import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestAuth } from 'src/common/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() userRequest: any,
  ): Promise<{ token: string; refreshToken: string }> {
    const { email, password } = userRequest;
    return await this.authService.createUser(email, password);
  }

  @Post('/signin')
  async signin(
    @Body() userRequest: any,
  ): Promise<{ token: string; refreshToken: string }> {
    const { email, password } = userRequest;
    return this.authService.login(email, password);
  }

  @Post('/signout')
  async signout(@Req() req: RequestAuth) {
    return this.authService.logout(req.user.uid);
  }
}
