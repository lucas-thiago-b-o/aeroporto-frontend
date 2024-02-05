import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PassagemComponent } from './passagem.component';
import { FormBuilder } from '@angular/forms';
import { CidadeService } from '../../../service/cidade.service';
import { VooService } from '../../../service/voo.service';
import { ClasseService } from '../../../service/classe.service';
import { PassagemService } from '../../../service/passagem.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import {MatAutocomplete} from "@angular/material/autocomplete";

@Injectable()
class MockCidadeService {}

@Injectable()
class MockVooService {}

@Injectable()
class MockClasseService {}

@Injectable()
class MockPassagemService {}

@Injectable()
class MockAuthService {}

@Injectable()
class MockRouter {
    navigate() {};
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
    @Input() myCustom: any;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
    transform(value: any) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
    transform(value: any) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
    transform(value: any) { return value; }
}

describe('PassagemComponent', () => {
    let fixture: ComponentFixture<PassagemComponent>;
    let component: { ngOnDestroy: () => void; dadosFormGroup: { patchValue?: any; controls?: any; }; preencheDados: (arg0: {}) => void; assentoFormGroup: { patchValue?: any; controls?: any; }; preencheAssento: (arg0: {}) => void; cidadeService: { getAllCidades?: any; }; optionsOrigem: string[]; optionsDestino: string[]; ngOnInit: () => void; retornaValor: jest.Mock<any, any, any> | ((arg0: { valor: {}; }) => void); acrescentaDezPorcento: (arg0: {}) => void; inputOrigem: { nativeElement?: any; }; filterOrigem: () => void; inputDestino: { nativeElement?: any; }; filterDestino: () => void; cidades: string[]; myControlOrigem: { value?: any; }; myControlDestino: { value?: any; }; vooService: { getAllVoosByCidades?: any; }; voos: {}; classeService: { getAllClassesByVooId?: any; }; pesquisarPassagens: () => void; processarNumeroTelefone: jest.Mock<any, any, any> | ((arg0: string) => void); authService: { getUuid?: any; }; passagemService: { savePassagem?: any; }; comprarPassagem: (arg0: { dataHoraMarcado: {}; }) => void; retornaAssento: (arg0: { assentos: { nome: {}; }; }) => void; retornaClasse: (arg0: { nome: {}; }) => void; };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule ],
            declarations: [
                PassagemComponent,
                TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
                MyCustomDirective, MatAutocomplete
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
            providers: [
                FormBuilder,
                { provide: CidadeService, useClass: MockCidadeService },
                { provide: VooService, useClass: MockVooService },
                { provide: ClasseService, useClass: MockClasseService },
                { provide: PassagemService, useClass: MockPassagemService },
                { provide: AuthService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter }
            ]
        }).overrideComponent(PassagemComponent, {

        }).compileComponents();
        fixture = TestBed.createComponent(PassagemComponent);
        component = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
        component.ngOnDestroy = function() {};
        fixture.destroy();
    });

    it('should run #constructor()', async () => {
        expect(component).toBeTruthy();
    });

    it('should run #preencheDados()', async () => {
        component.dadosFormGroup = component.dadosFormGroup || {};
        component.dadosFormGroup.patchValue = jest.fn();
        component.preencheDados({});
        expect(component.dadosFormGroup.patchValue).toHaveBeenCalled();
    });

    it('should run #preencheAssento()', async () => {
        component.assentoFormGroup = component.assentoFormGroup || {};
        component.assentoFormGroup.patchValue = jest.fn();
        component.preencheAssento({});
        expect(component.assentoFormGroup.patchValue).toHaveBeenCalled();
    });

    it('should run #ngOnInit()', async () => {
        component.cidadeService = component.cidadeService || {};
        component.cidadeService.getAllCidades = jest.fn().mockReturnValue(observableOf({}));
        component.optionsOrigem = component.optionsOrigem || {};
        component.optionsOrigem.push = jest.fn();
        component.optionsDestino = component.optionsDestino || {};
        component.optionsDestino.push = jest.fn();
        component.ngOnInit();
        expect(component.cidadeService.getAllCidades).toHaveBeenCalled();
    });

    it('should run #acrescentaDezPorcento()', async () => {
        component.retornaValor = jest.fn();
        component.acrescentaDezPorcento({});
        expect(component.retornaValor).toHaveBeenCalled();
    });

    it('should run #retornaValor()', async () => {
        component.retornaValor({
            valor: {}
        });
    });

    it('should run #filterOrigem()', async () => {
        component.inputOrigem = component.inputOrigem || {};
        component.inputOrigem.nativeElement = {
            value: 'value'
        };
        component.optionsOrigem = component.optionsOrigem || {};
        component.optionsOrigem = ['optionsOrigem'];
        component.filterOrigem();

    });

    it('should run #filterDestino()', async () => {
        component.inputDestino = component.inputDestino || {};
        component.inputDestino.nativeElement = {
            value: 'value'
        };
        component.optionsDestino = component.optionsDestino || {};
        component.optionsDestino = ['optionsDestino'];
        component.filterDestino();

    });

    it('should run #pesquisarPassagens()', async () => {
        const jsdomAlert = window.alert;
        window.alert = () => {};
        component.cidades = component.cidades || {};
        component.cidades = ['cidades'];
        component.myControlOrigem = component.myControlOrigem || {};
        component.myControlOrigem.value = 'value';
        component.myControlDestino = component.myControlDestino || {};
        component.myControlDestino.value = 'value';
        component.vooService = component.vooService || {};
        component.vooService.getAllVoosByCidades = jest.fn().mockReturnValue(observableOf({
            length: {}
        }));
        component.voos = component.voos || {};
        component.voos = {
            id: {}
        };
        component.classeService = component.classeService || {};
        component.classeService.getAllClassesByVooId = jest.fn().mockReturnValue(observableOf({}));
        component.pesquisarPassagens();
        window.alert = jsdomAlert;
        expect(component.vooService.getAllVoosByCidades).toHaveBeenCalled();
    });

    it('should run #comprarPassagem()', async () => {
        const jsdomAlert = window.alert;
        window.alert = () => {};
        component.dadosFormGroup = component.dadosFormGroup || {};
        component.dadosFormGroup.controls = {
            'bagagens': {
                value: {}
            },
            'telefone': {
                setValue: function() {},
                value: {}
            },
            'contatoEmergencia': {
                setValue: function() {},
                value: {}
            },
            'nome': {
                value: {}
            },
            'cpf': {
                value: {}
            },
            'rg': {
                value: {}
            },
            'passaporte': {
                value: {}
            },
            'dataNascimento': {
                value: 'value'
            }
        };
        component.processarNumeroTelefone = jest.fn();
        component.assentoFormGroup = component.assentoFormGroup || {};
        component.assentoFormGroup.controls = {
            'assento': {
                value: {
                    passageiro: {},
                    valor: {}
                }
            }
        };
        component.authService = component.authService || {};
        component.authService.getUuid = jest.fn();
        component.passagemService = component.passagemService || {};
        component.passagemService.savePassagem = jest.fn().mockReturnValue(observableOf({}));
        Object.defineProperty(window, 'location', {
            value: { reload: jest.fn() }
        });
        component.comprarPassagem({
            dataHoraMarcado: {}
        });
        window.alert = jsdomAlert;
        expect(component.processarNumeroTelefone).toHaveBeenCalled();
        expect(component.authService.getUuid).toHaveBeenCalled();
        expect(component.passagemService.savePassagem).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
    });

    it('should run #processarNumeroTelefone()', async () => {
        component.processarNumeroTelefone('numero');
    });

    it('should run #retornaAssento()', async () => {
        component.retornaAssento({
            assentos: {
                nome: {}
            }
        });
    });

    it('should run #retornaClasse()', async () => {
        component.retornaClasse({
            nome: {}
        });
    });

});