import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { VooComponent } from './voo.component';
import { VooService } from '../../../service/voo.service';
import { ClasseService } from '../../../service/classe.service';

@Injectable()
class MockVooService {}

@Injectable()
class MockClasseService {}

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

describe('VooComponent', () => {
  let fixture: ComponentFixture<VooComponent>;
  let component: { ngOnDestroy: () => void; vooService: { getAllVoos?: any; cancelarVoo?: any; }; classeService: { getQuantPassageirosByVoo?: any; }; quantPassageiros: { push?: any; }; ngOnInit: () => void; cancelarVoo: (arg0: {}) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        VooComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: VooService, useClass: MockVooService },
        { provide: ClasseService, useClass: MockClasseService }
      ]
    }).overrideComponent(VooComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(VooComponent);
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
    component.vooService = component.vooService || {};
    component.vooService.getAllVoos = jest.fn().mockReturnValue(observableOf({}));
    component.classeService = component.classeService || {};
    component.classeService.getQuantPassageirosByVoo = jest.fn().mockReturnValue(observableOf({}));
    component.quantPassageiros = component.quantPassageiros || {};
    component.quantPassageiros.push = jest.fn();
    component.ngOnInit();
    expect(component.vooService.getAllVoos).toHaveBeenCalled();
  });

  it('should run #cancelarVoo()', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => {};
    component.vooService = component.vooService || {};
    component.vooService.cancelarVoo = jest.fn().mockReturnValue(observableOf({}));
    component.cancelarVoo({});
    window.alert = jsdomAlert;
    expect(component.vooService.cancelarVoo).toHaveBeenCalled();
  });

});