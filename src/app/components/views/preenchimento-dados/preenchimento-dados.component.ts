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

  checaTelefoneLength(value: string) {
    const telefone = this.dadosFormGroup.get('telefone');

    if (value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 11) {
      telefone.setErrors(null);
    } else {
      telefone.setErrors({ incorrect: true });
    }

    telefone.markAsTouched();
  }

  checaContatoEmergenciaLength(value: string) {
    const contatoEmergencia = this.dadosFormGroup.get('contatoEmergencia');

    if (value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 11) {
      contatoEmergencia.setErrors(null);
    } else {
      contatoEmergencia.setErrors({ incorrect: true });
    }

    contatoEmergencia.markAsTouched();
  }

  checaDataLength(value: string) {
    const dataNascimento = this.dadosFormGroup.get('dataNascimento');

    if (value.replace(/\D/g, '').length === 8) {
      dataNascimento.setErrors(null);
    } else {
      dataNascimento.setErrors({ incorrect: true });
    }

    dataNascimento.markAsTouched();
  }

  checaRGLength(value: string) {
    const rg = this.dadosFormGroup.get('rg');

    if (value.replace(/\D/g, '').length === 9) {
      rg.setErrors(null);
    } else {
      rg.setErrors({ incorrect: true });
    }

    rg.markAsTouched();
  }


  checaCPFLength(value: string) {
    const cpf = this.dadosFormGroup.get('cpf');

    if (value.replace(/\D/g, '').length === 11) {
      cpf.setErrors(null);
    } else {
      cpf.setErrors({ incorrect: true });
    }

    cpf.markAsTouched();
  }

  emiteValores() {
    this.preencheDados.emit(this.dadosFormGroup);
  }

  selecionaQuantBagagem(event: any) {
    this.dadosFormGroup.controls.bagagens.setValue(event.value);
  }

}
