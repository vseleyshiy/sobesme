import { ProviderService } from '@/provider/provider.service';
import {
  Injectable,
  NotFoundException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthProviderGuard implements CanActivate {
  public constructor(private readonly provderService: ProviderService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const provider = request.params.provider as string;

    const providerInstance = this.provderService.findByService(provider);

    if (!providerInstance) {
      throw new NotFoundException(`Provider ${provider} is not found`);
    }

    return true;
  }
}
