import { Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ResultEvent } from 'src/domain/models/result.model';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

@WebSocketGateway()
export class LancadorGetWay implements OnModuleInit {
  private readonly logger = new Logger(LancadorGetWay.name);

  constructor(private eventEmitter: EventEmitter2) {}

  @WebSocketServer()
  server: Server;
  lastResult: ResultEvent;
  isWriting: boolean;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.debug(`Socket have Connected. ID: ${socket.id}`);
    });
    this.isWriting = true;
    this.startLoopWriter();
  }

  async startLoopWriter() {
    while (this.isWriting) {
      if (this.lastResult) {
        this.logger.debug(`Last result sent: ${this.lastResult.id}`);
        this.server.emit('onLastResult', this.lastResult);
      } else {
        this.logger.debug(`Without last result`);
      }
      await sleep(3000);
    }
  }

  @OnEvent('writing.strat')
  handleWritingtartEvent() {
    this.logger.debug(`Writing mode have started`);
    this.isWriting = true;
    this.startLoopWriter();
  }

  @OnEvent('writing.stop')
  handleWritingStopEvent() {
    this.logger.debug(`Writing mode have stoped`);
    this.isWriting = false;
  }

  @OnEvent('result.new')
  handleResultNewEvent(resultEvent: ResultEvent) {
    this.logger.debug(`Last result recived: ${resultEvent.id}`);
    this.lastResult = resultEvent;
  }
}
