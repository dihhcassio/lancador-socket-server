import { EventEmitter2 } from '@nestjs/event-emitter';
import { SaveUltimoResultado } from '../dtos/save-ultimo-reusltado.dto';
import { ILancadorService } from './interfaces/lancador.interface.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LancadorService implements ILancadorService {
  constructor(private eventEmitter: EventEmitter2) {}
  startSererWirting() {
    this.eventEmitter.emit('writing.strat');
  }
  stopServerWriting() {
    this.eventEmitter.emit('writing.stop');
  }

  reciveUltimoResultado(saveUltimoResultado: SaveUltimoResultado) {
    this.eventEmitter.emit('result.new', saveUltimoResultado);
  }
}
