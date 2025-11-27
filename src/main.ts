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

// import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';

// async function bootstrap() {
//   const logger = new Logger('Bootstrap');

//   const app = await NestFactory.create(AppModule);

//   await app.init();
//   logger.log('Application initialized, all modules ready');

//   // Connect gRPC microservice
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.GRPC,
//     options: {
//       package: 'course',
//       protoPath: require.resolve('ulms-contracts/protos/course.proto'),
//       url: '0.0.0.0:50053',
//     },
//   });

//   // Connect Kafka microservice
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.KAFKA,
//     options: {
//       client: {
//         clientId: 'assistant-service',
//         brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
//       },
//       consumer: {
//         groupId: 'assistant-service-consumer-server',
//       },
//     },
//   });

//   // Start all microservices
//   await app.startAllMicroservices();
//   logger.log('gRPC microservice started on 0.0.0.0:50053');
//   logger.log('Kafka consumer started');
// }
// bootstrap();
