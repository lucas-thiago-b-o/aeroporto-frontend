import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CidadeDTO, ClasseDTO} from "../shared/models/models";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  mappingPadrao = "/classes";

  constructor(private http: HttpClient) { }

  getQuantPassageirosByVoo(idVoo: number): Observable<number> {
    return this.http.get<number>(environment.baseUrl.concat(this.mappingPadrao).concat("/passageiros/").concat(String(idVoo)));
  }

  getAllClassesByVooId(idVoo: number): Observable<ClasseDTO[]> {
    return this.http.get<ClasseDTO[]>(environment.baseUrl.concat(this.mappingPadrao).concat("/classe/voo/").concat(String(idVoo)));
  }
}
