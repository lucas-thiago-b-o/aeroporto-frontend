import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreenchimentoDadosComponent } from './preenchimento-dados.component';

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

describe('PreenchimentoDadosComponent', () => {
  let fixture: ComponentFixture<PreenchimentoDadosComponent>;
  let component: { ngOnDestroy: () => void; ngOnInit: () => void; dadosFormGroup: { get?: any; controls?: any; }; checaTelefoneLength: (arg0: string) => void; checaContatoEmergenciaLength: (arg0: string) => void; checaDataLength: (arg0: string) => void; checaRGLength: (arg0: string) => void; checaCPFLength: (arg0: string) => void; preencheDados: { emit?: any; }; emiteValores: () => void; selecionaQuantBagagem: (arg0: { value: {}; }) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PreenchimentoDadosComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(PreenchimentoDadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PreenchimentoDadosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should run #checaTelefoneLength()', async () => {
    component.dadosFormGroup = component.dadosFormGroup || {};
    component.dadosFormGroup.get = jest.fn().mockReturnValue({
      markAsTouched: function() {},
      setErrors: function() {}
    });
    component.checaTelefoneLength('value');
    expect(component.dadosFormGroup.get).toHaveBeenCalled();
  });

  it('should run #checaContatoEmergenciaLength()', async () => {
    component.dadosFormGroup = component.dadosFormGroup || {};
    component.dadosFormGroup.get = jest.fn().mockReturnValue({
      markAsTouched: function() {},
      setErrors: function() {}
    });
    component.checaContatoEmergenciaLength('value');
    expect(component.dadosFormGroup.get).toHaveBeenCalled();
  });

  it('should run #checaDataLength()', async () => {
    component.dadosFormGroup = component.dadosFormGroup || {};
    component.dadosFormGroup.get = jest.fn().mockReturnValue({
      markAsTouched: function() {},
      setErrors: function() {}
    });
    component.checaDataLength('value');
    expect(component.dadosFormGroup.get).toHaveBeenCalled();
  });

  it('should run #checaRGLength()', async () => {
    component.dadosFormGroup = component.dadosFormGroup || {};
    component.dadosFormGroup.get = jest.fn().mockReturnValue({
      markAsTouched: function() {},
      setErrors: function() {}
    });
    component.checaRGLength('value');
    expect(component.dadosFormGroup.get).toHaveBeenCalled();
  });

  it('should run #checaCPFLength()', async () => {
    component.dadosFormGroup = component.dadosFormGroup || {};
    component.dadosFormGroup.get = jest.fn().mockReturnValue({
      markAsTouched: function() {},
      setErrors: function() {}
    });
    component.checaCPFLength('value');
    expect(component.dadosFormGroup.get).toHaveBeenCalled();
  });

  it('should run #emiteValores()', async () => {
    component.preencheDados = component.preencheDados || {};
    component.preencheDados.emit = jest.fn();
    component.emiteValores();
    expect(component.preencheDados.emit).toHaveBeenCalled();
  });

  it('should run #selecionaQuantBagagem()', async () => {
    component.dadosFormGroup = component.dadosFormGroup || {};
    component.dadosFormGroup.controls = {
      bagagens: {
        setValue: function() {}
      }
    };
    component.selecionaQuantBagagem({
      value: {}
    });

  });

});