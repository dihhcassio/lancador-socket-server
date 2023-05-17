import { Body, Controller, Get, Inject, Post, Put } from '@nestjs/common';
import { SaveUltimoResultado } from 'src/domain/dtos/save-ultimo-reusltado.dto';
import { ILancadorService } from 'src/domain/services/interfaces/lancador.interface.service';

@Controller()
export class LancadorController {
  constructor(
    @Inject('ILancadorService')
    private readonly paymentService: ILancadorService,
  ) {}

  @Post('save-last-result]')
  saveLastResult(@Body() saveUltimoResultado: SaveUltimoResultado) {
    return this.paymentService.reciveUltimoResultado(saveUltimoResultado);
  }

  @Put('start-server-writing')
  startSererWirting() {
    return this.paymentService.startSererWirting();
  }

  @Put('stop-server-writing')
  stopServerWriting() {
    return this.paymentService.stopServerWriting();
  }
}
