import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesDAO } from './dao/courses.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { OffersModule } from 'src/offers/offers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    OffersModule,
    ConfigModule.forRoot({isGlobal: true}),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (cfg: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [cfg.get<string>('KAFKA_BROKER') ?? 'localhost:9092'],
            },
            consumer: {
              groupId: 'assistant-agent-consumer',
            }
          }
        }),
        inject: [ConfigService]
      },
    ])
  ],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesDAO, PrismaService],
})
export class CoursesModule {}
