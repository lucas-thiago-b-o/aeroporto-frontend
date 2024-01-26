import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CidadeService} from "../../../service/cidade.service";
import {VooService} from "../../../service/voo.service";
import {CidadeDTO} from "../../../shared/models/models";

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
  optionsOrigem: string[] = [];
  filteredOptionsOrigem: string[];
  optionsDestino: string[] = [];
  filteredOptionsDestino: string[];

  constructor(
      public cidadeService: CidadeService,
      public vooService: VooService
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
        console.log(voos)
    });
  }

}
