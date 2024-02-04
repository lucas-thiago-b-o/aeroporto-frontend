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

        var pdf = new jsPDF('l', 'px', [canvas.width - 259.5, canvas.height - 312]);

        var imgData = canvas.toDataURL("image/png", 1.0);
        pdf.addImage(imgData, -19, 0, canvas.width, canvas.height);
        pdf.save('Voucher.pdf');
      });
   } else {
      alert('Não é mais permitido baixar o voucher, pois já tem menos ou 5 horas em comparação a data marcada do voo.')
    }
  }

  verificarDiferencaDeHoras(dataComparacao: any) {
      const dataAtual: any = new Date();

      const dataComparacaoObj: any = new Date(dataComparacao);

      const diferencaEmMilissegundos = Math.abs(dataAtual - dataComparacaoObj);

      const diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);

      return diferencaEmHoras <= 5;
  }

  cancelarPassagem(passagem: PassagemDTO) {
      this.passagemService.cancelarPassagem(passagem).subscribe(n => {
         alert(n);
      }, (error) => {
          console.log(error.error.text);
      }, () => {
          window.location.reload();
      });
  }

}
