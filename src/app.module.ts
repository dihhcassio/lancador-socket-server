import { Module } from '@nestjs/common';
import { LancadorService } from './domain/services/lancador.service';
import { LancadorController } from './app/controllers/lancador.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LancadorGetWay } from './app/getways/lancador.getway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [LancadorController],
  providers: [
    { provide: 'ILancadorService', useClass: LancadorService },
    LancadorGetWay,
  ],
})
export class AppModule {}
