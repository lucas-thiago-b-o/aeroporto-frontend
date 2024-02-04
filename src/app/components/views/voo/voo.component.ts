import {Component, OnInit} from '@angular/core';
import {VooService} from "../../../service/voo.service";
import {VooDTO} from "../../../shared/models/models";
import {ClasseService} from "../../../service/classe.service";

@Component({
  selector: 'app-voo',
  templateUrl: './voo.component.html',
  styleUrls: ['./voo.component.css']
})
export class VooComponent implements OnInit {

  voos: VooDTO[] = [];
  quantPassageiros: number[] = [];

  constructor(
      private vooService: VooService,
      private classeService: ClasseService,
  ) { }

  ngOnInit(): void {
    this.vooService.getAllVoos().subscribe(v => {
      this.voos = v;
    }, (error) => {
      console.log(error.error.text);
    }, () => {
      this.voos.forEach(async v => {
        const passageiros = await this.classeService.getQuantPassageirosByVoo(v.id).toPromise();
        this.quantPassageiros.push(<number>passageiros);
      });
    });
  }

  cancelarVoo(id: number) {
    this.vooService.cancelarVoo(id).subscribe(s => {
      alert(s);
    }, (error) => {
      console.log(error.error.text);
    });
  }
}
