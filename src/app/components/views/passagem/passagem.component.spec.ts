import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CidadeService } from '../../../service/cidade.service';
import { VooService } from '../../../service/voo.service';
import { VooDTO } from '../../../shared/models/models';
import { ClasseService } from '../../../service/classe.service';
import { AuthService } from '../../../service/auth.service';
import { PassagemService } from '../../../service/passagem.service';
import { Router } from '@angular/router';
import { PassagemComponent } from './passagem.component';

describe('PassagemComponent', () => {
  let component: PassagemComponent;
  let fixture: ComponentFixture<PassagemComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({});
    const cidadeServiceStub = () => ({
      getAllCidades: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const vooServiceStub = () => ({
      getAllVoosByCidades: (idOrigem: any, idDestino: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const classeServiceStub = () => ({
      getAllClassesByVooId: (id: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const authServiceStub = () => ({ getUuid: () => ({}) });
    const passagemServiceStub = () => ({
      savePassagem: (passagem: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const routerStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PassagemComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CidadeService, useFactory: cidadeServiceStub },
        { provide: VooService, useFactory: vooServiceStub },
        { provide: ClasseService, useFactory: classeServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: PassagemService, useFactory: passagemServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(PassagemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`cidades has default value`, () => {
    expect(component.cidades).toEqual([]);
  });

  it(`voos has default value`, () => {
    expect(component.voos).toEqual([]);
  });

  it(`classes has default value`, () => {
    expect(component.classes).toEqual([]);
  });

  it(`optionsOrigem has default value`, () => {
    expect(component.optionsOrigem).toEqual([]);
  });

  it(`optionsDestino has default value`, () => {
    expect(component.optionsDestino).toEqual([]);
  });

  describe('comprarPassagem', () => {
    it('makes expected calls', () => {
      const vooDTOStub: VooDTO = <any>{};
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const passagemServiceStub: PassagemService = fixture.debugElement.injector.get(
        PassagemService
      );
      spyOn(component, 'processarNumeroTelefone').and.callThrough();
      spyOn(authServiceStub, 'getUuid').and.callThrough();
      spyOn(passagemServiceStub, 'savePassagem').and.callThrough();
      component.comprarPassagem(vooDTOStub);
      expect(component.processarNumeroTelefone).toHaveBeenCalled();
      expect(authServiceStub.getUuid).toHaveBeenCalled();
      expect(passagemServiceStub.savePassagem).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const cidadeServiceStub: CidadeService = fixture.debugElement.injector.get(
        CidadeService
      );
      spyOn(cidadeServiceStub, 'getAllCidades').and.callThrough();
      component.ngOnInit();
      expect(cidadeServiceStub.getAllCidades).toHaveBeenCalled();
    });
  });

  describe('pesquisarPassagens', () => {
    it('makes expected calls', () => {
      const vooServiceStub: VooService = fixture.debugElement.injector.get(
        VooService
      );
      const classeServiceStub: ClasseService = fixture.debugElement.injector.get(
        ClasseService
      );
      spyOn(vooServiceStub, 'getAllVoosByCidades').and.callThrough();
      spyOn(classeServiceStub, 'getAllClassesByVooId').and.callThrough();
      component.pesquisarPassagens();
      expect(vooServiceStub.getAllVoosByCidades).toHaveBeenCalled();
      expect(classeServiceStub.getAllClassesByVooId).toHaveBeenCalled();
    });
  });
});
