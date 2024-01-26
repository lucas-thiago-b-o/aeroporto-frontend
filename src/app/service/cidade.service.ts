import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CidadeDTO} from "../shared/models/models";

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  mappingPadrao = "/cidades";

  constructor(private http: HttpClient) { }

  getAllCidades(): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(environment.baseUrl.concat(this.mappingPadrao).concat("/cidade"));
  }
}
