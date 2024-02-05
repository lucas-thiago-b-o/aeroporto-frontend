import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf} from 'rxjs';

import { MinhasPassagensComponent } from './minhas-passagens.component';
import { AuthService } from '../../../service/auth.service';
import { PassagemService } from '../../../service/passagem.service';

@Injectable()
class MockAuthService {}

@Injectable()
class MockPassagemService {}

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

describe('MinhasPassagensComponent', () => {
    let fixture: ComponentFixture<MinhasPassagensComponent>;
    let component: { ngOnDestroy: () => void; authService: { getUuid?: any; }; passagemService: { getPassagemByUsuario?: any; cancelarPassagem?: any; }; ngOnInit: () => void; verificarDiferencaDeHoras: jest.Mock<any, any, any> | ((arg0: {}) => void); htmltoPDF: (arg0: {}, arg1: {}) => void; cancelarPassagem: (arg0: {}) => void; };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule ],
            declarations: [
                MinhasPassagensComponent,
                TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
                MyCustomDirective
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: PassagemService, useClass: MockPassagemService }
            ]
        }).overrideComponent(MinhasPassagensComponent, {

        }).compileComponents();
        fixture = TestBed.createComponent(MinhasPassagensComponent);
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
        component.authService = component.authService || {};
        component.authService.getUuid = jest.fn();
        component.passagemService = component.passagemService || {};
        component.passagemService.getPassagemByUsuario = jest.fn().mockReturnValue(observableOf({}));
        component.ngOnInit();
        expect(component.authService.getUuid).toHaveBeenCalled();
        expect(component.passagemService.getPassagemByUsuario).toHaveBeenCalled();
    });

    it('should run #verificarDiferencaDeHoras()', async () => {
        component.verificarDiferencaDeHoras({});
    });

    it('should run #cancelarPassagem()', async () => {
        const jsdomAlert = window.alert;
        window.alert = () => {};
        component.passagemService = component.passagemService || {};
        component.passagemService.cancelarPassagem = jest.fn().mockReturnValue(observableOf({}));
        Object.defineProperty(window, 'location', {
            value: { reload: jest.fn() }
        });
        component.cancelarPassagem({});
        window.alert = jsdomAlert;
        expect(component.passagemService.cancelarPassagem).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
    });

});