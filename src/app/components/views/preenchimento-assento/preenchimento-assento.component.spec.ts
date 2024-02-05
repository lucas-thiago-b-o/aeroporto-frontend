import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreenchimentoAssentoComponent } from './preenchimento-assento.component';

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

describe('PreenchimentoAssentoComponent', () => {
    let fixture: ComponentFixture<PreenchimentoAssentoComponent>;
    let component: { ngOnDestroy: () => void; ngOnInit: () => void; assentosSelecionados: string[]; assentoFormGroup: { reset?: any; controls?: any; }; preencheAssento: { emit?: any; }; cadeiraSelecionada: (arg0: { target: { style: { backgroundColor: {}; }; }; }, arg1: { id: {}; nome: {}; }) => void; };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule ],
            declarations: [
                PreenchimentoAssentoComponent,
                TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
                MyCustomDirective
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
            providers: [

            ]
        }).overrideComponent(PreenchimentoAssentoComponent, {

        }).compileComponents();
        fixture = TestBed.createComponent(PreenchimentoAssentoComponent);
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

    it('should run #cadeiraSelecionada()', async () => {
        component.assentosSelecionados = component.assentosSelecionados || {};
        component.assentosSelecionados = ['assentosSelecionados'];
        component.assentosSelecionados.splice = jest.fn();
        component.assentosSelecionados.findIndex = jest.fn().mockReturnValue([
            {
                "id": {}
            }
        ]);
        component.assentosSelecionados.push = jest.fn();
        component.assentosSelecionados.pop = jest.fn();
        component.assentoFormGroup = component.assentoFormGroup || {};
        component.assentoFormGroup.reset = jest.fn();
        component.assentoFormGroup.controls = {
            assento: {
                patchValue: function() {}
            }
        };
        component.preencheAssento = component.preencheAssento || {};
        component.preencheAssento.emit = jest.fn();
        component.cadeiraSelecionada({
            target: {
                style: {
                    backgroundColor: {}
                }
            }
        }, {
            id: {},
            nome: {}
        });
        expect(component.assentosSelecionados.push).toHaveBeenCalled();
        expect(component.preencheAssento.emit).toHaveBeenCalled();
    });

});