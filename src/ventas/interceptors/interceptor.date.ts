import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HorarioVentaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 18 || hour < 6) {
      throw new UnauthorizedException('Los pedidos no se pueden procesar entre las 6pm y las 6am.');
    }

    return next.handle();
  }
}