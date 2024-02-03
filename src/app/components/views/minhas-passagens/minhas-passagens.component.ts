import { Component, OnInit } from '@angular/core';
import {PassagemService} from "../../../service/passagem.service";
import {AuthService} from "../../../service/auth.service";
import {PassagemDTO} from "../../../shared/models/models";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-minhas-passagens',
  templateUrl: './minhas-passagens.component.html',
  styleUrls: ['./minhas-passagens.component.css']
})
export class MinhasPassagensComponent implements OnInit {

  passagens: PassagemDTO[] = [];

  constructor(
      private authService: AuthService,
      private passagemService: PassagemService
  ) { }

  ngOnInit(): void {
    const uuid = this.authService.getUuid();
    this.passagemService.getPassagemByUsuario(uuid).subscribe(passagens => {
      console.log(passagens);
      this.passagens = passagens;
    });
  }

  htmltoPDF(elementId: string, dataHoraMarcado: any) {

    if (!this.verificarDiferencaDeHoras(dataHoraMarcado)) {
      html2canvas(<HTMLElement>document.querySelector("#" + elementId), {
        allowTaint: false,
        useCORS: true,
        scale: 2,
      }).then(canvas => {

        var pdf = new jsPDF('l', 'px', [canvas.width - 259.5, canvas.height - 225]);

        var imgData = canvas.toDataURL("image/png", 1.0);
        pdf.addImage(imgData, -19, 0, canvas.width, canvas.height);
        pdf.save('Voucher.pdf');
      });
   } else {
      alert('Não é mais permitido baixar o voucher, pois já tem menos ou 5 horas em comparação a data marcada do voo.')
    }
  }

  verificarDiferencaDeHoras(dataComparacao: any) {
      // Obtém a data e hora atual
      const dataAtual: any = new Date();

      // Converte a data de comparação para o objeto Date
      const dataComparacaoObj: any = new Date(dataComparacao);

      // Calcula a diferença em milissegundos
      const diferencaEmMilissegundos = Math.abs(dataAtual - dataComparacaoObj);

      // Converte a diferença para horas
      const diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);

      // Verifica se a diferença é de 5 horas ou menos
      return diferencaEmHoras <= 5;
  }

}
