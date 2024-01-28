import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CidadeService} from "../../../service/cidade.service";
import {VooService} from "../../../service/voo.service";
import {CidadeDTO, ClasseDTO, VooDTO} from "../../../shared/models/models";
import {ClasseService} from "../../../service/classe.service";

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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  blocks: number[][][] = [];

  constructor(
      private _formBuilder: FormBuilder,
      public cidadeService: CidadeService,
      public vooService: VooService,
      public classeService: ClasseService,
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

      for (let i = 0; i < 5; i++) {
        const block: number[][] = [];

        if (i === 0) {
          block.push(Array.from({length: 13}, (_, index) => index));
        } else {
          for (let j = 0; j < 4; j++) {
            block.push(Array.from({length: 13}, (_, index) => 13 * i + j * 13 + index));
          }
        }

      this.blocks.push(block);
    }

  }

  toggleSelection(retangulo: any) {
    console.log(retangulo);
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
    const idOrigem = this.cidades.filter(o => o.nome.toLowerCase().includes(this.myControlOrigem.value.toLowerCase()))[0].id;
    const idDestino = this.cidades.filter(o => o.nome.toLowerCase().includes(this.myControlDestino.value.toLowerCase()))[0].id;
    this.vooService.getAllVoos(idOrigem, idDestino).subscribe(voos => {
      if (voos && voos.length > 0) {
        this.voos = voos;

        this.classeService.getAllClassesByVooId(this.voos[0].id).subscribe(classe => {
          this.classes = classe;
          console.log(this.classes);
        });
      } else {
        alert('Não há voos disponíveis para estas localidades.');
      }
    });
  }

}
