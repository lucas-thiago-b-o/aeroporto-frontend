import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-preenchimento-dados',
  templateUrl: './preenchimento-dados.component.html',
  styleUrls: ['./preenchimento-dados.component.css']
})
export class PreenchimentoDadosComponent implements OnInit {

  @Input() readable: any;
  @Input() dadosFormGroup: any;

  @Output() preencheDados = new EventEmitter;

  maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
  maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskData = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit(): void {
  }

  emiteValores() {
    this.preencheDados.emit(this.dadosFormGroup);
  }

  selecionaQuantBagagem(event: any) {
    this.dadosFormGroup.controls.bagagens.setValue(event.value);
  }

}
