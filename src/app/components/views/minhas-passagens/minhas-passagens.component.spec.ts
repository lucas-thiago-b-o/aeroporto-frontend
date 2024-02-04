import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PassagemService } from '../../../service/passagem.service';
import { AuthService } from '../../../service/auth.service';
import { PassagemDTO } from '../../../shared/models/models';
import { MinhasPassagensComponent } from './minhas-passagens.component';

describe('MinhasPassagensComponent', () => {
  let component: MinhasPassagensComponent;
  let fixture: ComponentFixture<MinhasPassagensComponent>;

  beforeEach(() => {
    const passagemServiceStub = () => ({
      getPassagemByUsuario: (uuid: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      cancelarPassagem: (passagem: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const authServiceStub = () => ({ getUuid: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MinhasPassagensComponent],
      providers: [
        { provide: PassagemService, useFactory: passagemServiceStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MinhasPassagensComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`passagens has default value`, () => {
    expect(component.passagens).toEqual([]);
  });

  describe('cancelarPassagem', () => {
    it('makes expected calls', () => {
      const passagemServiceStub: PassagemService = fixture.debugElement.injector.get(
        PassagemService
      );
      const passagemDTOStub: PassagemDTO = <any>{};
      spyOn(passagemServiceStub, 'cancelarPassagem').and.callThrough();
      component.cancelarPassagem(passagemDTOStub);
      expect(passagemServiceStub.cancelarPassagem).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const passagemServiceStub: PassagemService = fixture.debugElement.injector.get(
        PassagemService
      );
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(passagemServiceStub, 'getPassagemByUsuario').and.callThrough();
      spyOn(authServiceStub, 'getUuid').and.callThrough();
      component.ngOnInit();
      expect(passagemServiceStub.getPassagemByUsuario).toHaveBeenCalled();
      expect(authServiceStub.getUuid).toHaveBeenCalled();
    });
  });
});
