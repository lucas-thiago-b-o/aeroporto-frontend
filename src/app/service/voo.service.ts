import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VooDTO} from "../shared/models/models";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VooService {

  mappingPadrao = "/voos";

  constructor(private http: HttpClient) { }

  getAllVoos(): Observable<VooDTO[]> {
    return this.http.get<VooDTO[]>(environment.baseUrl.concat(this.mappingPadrao).concat('/voo'));
  }

  getAllVoosByCidades(idOrigem: number, idDestino: number): Observable<VooDTO[]> {
    return this.http.get<VooDTO[]>(environment.baseUrl.concat(this.mappingPadrao)
           .concat(`/voo/aeroporto/cidade_origem/${idOrigem}/cidade_destino/${idDestino}`));
  }

  cancelarVoo() {

  }
}
