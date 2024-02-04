import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VooService } from '../../../service/voo.service';
import { ClasseService } from '../../../service/classe.service';
import { VooComponent } from './voo.component';

describe('VooComponent', () => {
  let component: VooComponent;
  let fixture: ComponentFixture<VooComponent>;

  beforeEach(() => {
    const vooServiceStub = () => ({
      getAllVoos: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      cancelarVoo: (id: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const classeServiceStub = () => ({
      getQuantPassageirosByVoo: (id: any) => ({ toPromise: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [VooComponent],
      providers: [
        { provide: VooService, useFactory: vooServiceStub },
        { provide: ClasseService, useFactory: classeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(VooComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`voos has default value`, () => {
    expect(component.voos).toEqual([]);
  });

  it(`quantPassageiros has default value`, () => {
    expect(component.quantPassageiros).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const vooServiceStub: VooService = fixture.debugElement.injector.get(
        VooService
      );
      const classeServiceStub: ClasseService = fixture.debugElement.injector.get(
        ClasseService
      );
      spyOn(vooServiceStub, 'getAllVoos').and.callThrough();
      spyOn(classeServiceStub, 'getQuantPassageirosByVoo').and.callThrough();
      component.ngOnInit();
      expect(vooServiceStub.getAllVoos).toHaveBeenCalled();
      expect(classeServiceStub.getQuantPassageirosByVoo).toHaveBeenCalled();
    });
  });
});
