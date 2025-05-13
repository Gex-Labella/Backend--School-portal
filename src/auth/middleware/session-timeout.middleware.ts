import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SessionExpiredException } from '../exceptions/auth.exceptions';

@Injectable()
export class SessionTimeoutMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    
    next();
    
    if (token) {
      try {
        const decodedToken = this.jwtService.decode(token) as { exp: number };
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Check if token is about to expire (within 5 minutes)
        if (decodedToken.exp - currentTime < 300) {
          // Optionally, refresh token here
          throw new SessionExpiredException();
        }
      } catch {
        throw new SessionExpiredException();
      }
    }
    
    next();
  }
}