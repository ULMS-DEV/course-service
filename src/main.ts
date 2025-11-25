import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.GRPC,
    options: {
      package: 'course',
      protoPath: require.resolve('ulms-contracts/protos/course.proto'),
      url: '0.0.0.0:50053'
    }
  })
  await app.listen();
}
bootstrap();