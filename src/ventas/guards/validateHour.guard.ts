import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class validateHour implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const currentHour = new Date().getHours();

    // Hora en formato 24 horas: de 18 (6 PM) a 6 (6 AM)
    if (currentHour >= 18 || currentHour < 6) {
      throw new ForbiddenException('Pedidos no se pueden procesar entre las 6 PM y las 6 AM');
    }

    return true;
  }
}