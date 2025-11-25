import { Module } from '@nestjs/common';
import { OffersService } from './offers.services';
import { OffersDAO } from './dao/offers.dao';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OffersService, OffersDAO, PrismaService],
  exports: [OffersService],
})
export class OffersModule {}
