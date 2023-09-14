import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  preferences() {
    return this.prismaService.finance.findUnique({
      where: {
        id: '64fd096050f4321e14ddc71b',
      },
      include: {
        invoice: {
          include: {
            InvoiceProduct: {
              include: {
                product: true,
              },
            },
            Payment: true,
          },
        },
      },
    });
  }
}
