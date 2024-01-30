import {Component, Input, OnInit} from '@angular/core';
import {ClasseDTO} from "../../../shared/models/models";

@Component({
  selector: 'app-preenchimento-assento',
  templateUrl: './preenchimento-assento.component.html',
  styleUrls: ['./preenchimento-assento.component.css']
})
export class PreenchimentoAssentoComponent implements OnInit {

  @Input() assentoFormGroup: any;
  @Input() classes: ClasseDTO[] | undefined;

  assentosSelecionados: ClasseDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  cadeiraSelecionada(evento: any, classe: ClasseDTO) {

   if (this.assentosSelecionados.length <= 5 && this.assentosSelecionados.filter(f => f.id === classe.id).length > 0) {
      this.assentosSelecionados.splice(this.assentosSelecionados.findIndex(f => f.id === classe.id), 1);
   } else if (this.assentosSelecionados.length <= 5 && this.assentosSelecionados.filter(f => f.id === classe.id).length <= 0) {
      this.assentosSelecionados.push(classe);
   }

   if (this.assentosSelecionados.length <= 5) {
     const cadeira: HTMLInputElement = evento.target;
     if (cadeira.style.backgroundColor === 'lightgreen') {
       cadeira.style.backgroundColor = 'cornflowerblue';
     } else {
       cadeira.style.backgroundColor = 'lightgreen'
     }
   } else {
     this.assentosSelecionados.pop();
     alert("Somente é permitido selecionar 5 lugares por CPF")
   }
   
  }

}
