import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesDAO } from './dao/courses.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { OffersModule } from 'src/offers/offers.module';

@Module({
  imports: [OffersModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesDAO, PrismaService],
})
export class CoursesModule {}
