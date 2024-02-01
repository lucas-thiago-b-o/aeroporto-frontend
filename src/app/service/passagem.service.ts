import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ClasseDTO, PassagemDTO} from "../shared/models/models";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PassagemService {

  mappingPadrao = "/passagens";

  constructor(private http: HttpClient) { }

  savePassagem(passagem: any): Observable<any> {
    const requestOptions: Object = {
      responseType: 'text'
    }

    return this.http.post<PassagemDTO>(environment.baseUrl.concat(this.mappingPadrao).concat("/passagem"), passagem, requestOptions);
  }

  getPassagemByUsuario(uuid: string): Observable<PassagemDTO[]> {
    return this.http.get<PassagemDTO[]>(environment.baseUrl.concat(this.mappingPadrao).concat("/passagem/").concat(String(uuid)));
  }
}
