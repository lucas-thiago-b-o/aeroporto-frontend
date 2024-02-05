import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CidadeService} from "../../../service/cidade.service";
import {VooService} from "../../../service/voo.service";
import {CidadeDTO, ClasseDTO, VooDTO} from "../../../shared/models/models";
import {ClasseService} from "../../../service/classe.service";
import {AuthService} from "../../../service/auth.service";
import {PassagemService} from "../../../service/passagem.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passagem',
  templateUrl: './passagem.component.html',
  styleUrls: ['./passagem.component.css']
})
export class PassagemComponent implements OnInit {

  @ViewChild('input') inputOrigem: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('input2') inputDestino: ElementRef<HTMLInputElement> | undefined;
  myControlOrigem = new FormControl('');
  myControlDestino = new FormControl('');
  cidades: CidadeDTO[] = [];
  voos: VooDTO[] = [];
  classes: ClasseDTO[] = [];
  optionsOrigem: string[] = [];
  filteredOptionsOrigem: string[];
  optionsDestino: string[] = [];
  filteredOptionsDestino: string[];

  dadosFormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    telefone: ['', Validators.required],
    contatoEmergencia: ['', Validators.required],
    passaporte: ['', Validators.required],
    bagagens: ['', Validators.required],
  });

  assentoFormGroup = this.formBuilder.group({
    assento: ['', Validators.required],
  });

  seats = Array.from({ length: 676 }, (_, i) => i + 1);

  preencheDados(event: any) {
    this.dadosFormGroup.patchValue(event);
  }

  preencheAssento(event: any) {
    this.assentoFormGroup.patchValue(event);
  }

  constructor(
      private formBuilder: FormBuilder,
      public cidadeService: CidadeService,
      public vooService: VooService,
      public classeService: ClasseService,
      public passagemService: PassagemService,
      public authService: AuthService,
      public route: Router
  ) {
    this.filteredOptionsOrigem = this.optionsOrigem.slice();
    this.filteredOptionsDestino = this.optionsDestino.slice();
  }

  ngOnInit(): void {
      this.cidadeService.getAllCidades().subscribe(cidades => {
       this.cidades = cidades;

       cidades.forEach(cidade => {
         this.optionsOrigem.push(cidade.nome);
         this.optionsDestino.push(cidade.nome);
       });
      });
  }

  acrescentaDezPorcento(value: any) {
    const valor = this.retornaValor(value);
    return  valor + (valor * 0.10);
  }

  retornaValor(valor: any) {
    return valor ? valor.valor : null;
  }

  filterOrigem(): void {
   if (this.inputOrigem) {
     const filterValue = this.inputOrigem.nativeElement.value.toLowerCase();
     this.filteredOptionsOrigem = this.optionsOrigem.filter(o => o.toLowerCase().includes(filterValue));
   }
  }

  filterDestino(): void {
    if (this.inputDestino) {
      const filterValue = this.inputDestino.nativeElement.value.toLowerCase();
      this.filteredOptionsDestino = this.optionsDestino.filter(o => o.toLowerCase().includes(filterValue));
    }
  }

  pesquisarPassagens() {
    const idOrigem = this.cidades.filter(o => o.nome?.toLowerCase().includes(this.myControlOrigem.value.toLowerCase()))[0]?.id;
    const idDestino = this.cidades.filter(o => o.nome?.toLowerCase().includes(this.myControlDestino.value.toLowerCase()))[0]?.id;
    this.vooService.getAllVoosByCidades(idOrigem, idDestino).subscribe(voos => {
      if (voos && voos.length > 0) {
        this.voos = voos;

        this.classeService.getAllClassesByVooId(this.voos[0].id).subscribe(classe => {
          this.classes = classe;
        });
      } else {
        alert('Não há voos disponíveis para estas localidades.');
      }
    });
  }

  comprarPassagem(voo: VooDTO) {
    const bagagens = [];
    for(let i = 1; i <= this.dadosFormGroup.controls['bagagens'].value; i++) {
      bagagens.push({
        id: null,
        numeroIdentificacao: null,
        isDespachada: this.dadosFormGroup.controls['bagagens'].value > 1
      });
    }

    this.dadosFormGroup.controls['telefone'].setValue(
        this.processarNumeroTelefone(this.dadosFormGroup.controls['telefone'].value)
    );

    this.dadosFormGroup.controls['contatoEmergencia'].setValue(
        this.processarNumeroTelefone(this.dadosFormGroup.controls['contatoEmergencia'].value)
    )

    this.assentoFormGroup.controls['assento'].value.passageiro = {
      id: null,
      nomeCompleto: this.dadosFormGroup.controls['nome'].value,
      cpf: this.dadosFormGroup.controls['cpf'].value,
      rg: this.dadosFormGroup.controls['rg'].value,
      passaporte: this.dadosFormGroup.controls['passaporte'].value,
      dataNascimento: new Date(this.dadosFormGroup.controls['dataNascimento'].value.split("/").reverse().join(", ")),
      telefone: this.dadosFormGroup.controls['telefone'].value,
      contatoEmergencia: this.dadosFormGroup.controls['contatoEmergencia'].value,
      bagagens: bagagens
    };

    const passagem = {
      id: null,
      portaoEmbarque: null,
      uuidUsuario: this.authService.getUuid(),
      dataHoraVoo: voo.dataHoraMarcado,
      valor: this.assentoFormGroup.controls['assento'].value.valor,
      numeroIdentificacao: null,
      classe: this.assentoFormGroup.controls['assento'].value
    };

    this.passagemService.savePassagem(passagem).subscribe(n => {
      alert(n);
    }, (error) => {
      console.log(error.error.text);
    }, () => {
      window.location.reload();
    });
  }

  processarNumeroTelefone(numero: any) {
    var numeroLimpo = numero.replace(/\D/g, '');

    return numeroLimpo.length === 10 ? '(' + numeroLimpo.substring(0, 2) + ') ' + numeroLimpo.substring(2, 6) + '-' + numeroLimpo.substring(6) : numero;
  }

  retornaAssento(assento: any) {
    return assento ? assento.assentos.nome : null;
  }

  retornaClasse(classe: any) {
    return classe ? classe.nome : null;
  }

}
