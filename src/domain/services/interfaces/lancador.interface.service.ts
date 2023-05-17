import { SaveUltimoResultado } from 'src/domain/dtos/save-ultimo-reusltado.dto';

export interface ILancadorService {
  reciveUltimoResultado(saveUltimoResultado: SaveUltimoResultado);
  startSererWirting();
  stopServerWriting();
}
