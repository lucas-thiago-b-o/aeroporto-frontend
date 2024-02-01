import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClasseDTO} from "../../../shared/models/models";

@Component({
  selector: 'app-preenchimento-assento',
  templateUrl: './preenchimento-assento.component.html',
  styleUrls: ['./preenchimento-assento.component.css']
})
export class PreenchimentoAssentoComponent implements OnInit {

  @Input() assentoFormGroup: any;
  @Input() classes: ClasseDTO[] | undefined;

  @Output() preencheAssento = new EventEmitter;

  assentosSelecionados: ClasseDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  cadeiraSelecionada(evento: any, classe: ClasseDTO) {

   if (this.assentosSelecionados.length <= 1 && this.assentosSelecionados.filter(f => f.id === classe.id).length > 0) {
      this.assentosSelecionados.splice(this.assentosSelecionados.findIndex(f => f.id === classe.id), 1);
      this.assentoFormGroup.reset();
   } else if (this.assentosSelecionados.length <= 1 && this.assentosSelecionados.filter(f => f.id === classe.id).length <= 0) {
      this.assentosSelecionados.push(classe);
      this.assentoFormGroup.controls.assento.patchValue(classe);
   }

   if (this.assentosSelecionados.length <= 1) {
     const cadeira: HTMLInputElement = evento.target;
     if (cadeira.style.backgroundColor === 'lightgreen' || cadeira.style.backgroundColor === 'lemonchiffon') {
       cadeira.style.backgroundColor = 'cornflowerblue';
     } else if (cadeira.style.backgroundColor === 'cornflowerblue' && classe.nome === 'Primeira Classe') {
       cadeira.style.backgroundColor = 'lightgreen'
     } else if (cadeira.style.backgroundColor === 'cornflowerblue' && classe.nome === 'Classe Econômica') {
       cadeira.style.backgroundColor = 'lemonchiffon'
     }
   } else {
     this.assentosSelecionados.pop();
     alert("Somente é permitido selecionar 1 lugar por CPF")
   }

   this.preencheAssento.emit(this.assentoFormGroup);
   
  }

}
