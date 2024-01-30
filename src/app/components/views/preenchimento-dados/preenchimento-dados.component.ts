import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-preenchimento-dados',
  templateUrl: './preenchimento-dados.component.html',
  styleUrls: ['./preenchimento-dados.component.css']
})
export class PreenchimentoDadosComponent implements OnInit {

  @Input() readable: any;
  @Input() dadosFormGroup: any;

  maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
  maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit(): void {
  }

}
