import { ComponentFixture, TestBed} from '@angular/core/testing';
import {
    Pipe,
    PipeTransform,
    Injectable,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
    Directive,
    Input
} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of as observableOf} from 'rxjs';
import {LoginComponent} from './login.component';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';

@Injectable()
class MockAuthService {
}

@Injectable()
class MockRouter {
    navigate() {
    };
}

@Directive({selector: '[myCustom]'})
class MyCustomDirective {
    @Input() myCustom: any;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
    transform(value: any) {
        return value;
    }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
    transform(value: any) {
        return value;
    }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
    transform(value: any) {
        return value;
    }
}

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: { ngOnDestroy: () => void; ngOnInit: () => void; service: { proceedLogin?: any; proceedRegister?: any; }; route: { navigate?: any; }; proceedLogin: jest.Mock<any, any, any> | ((arg0: { username: {}; password: {}; }) => void); proceedRegister: jest.Mock<any, any, any> | ((arg0: {}) => void); form: { valid?: any; value?: any; }; submitLogin: () => void; submitRegister: () => void; };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule ],
            declarations: [
                LoginComponent,
                TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
                MyCustomDirective
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter }
            ]
        }).overrideComponent(LoginComponent, {

        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
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

    it('should run #proceedLogin()', async () => {
        const jsdomAlert = window.alert;
        window.alert = () => {};
        component.service = component.service || {};
        component.service.proceedLogin = jest.fn().mockReturnValue(observableOf({
            token: {}
        }));
        component.route = component.route || {};
        component.route.navigate = jest.fn();
        component.proceedLogin({
            username: {},
            password: {}
        });
        window.alert = jsdomAlert;
        expect(component.service.proceedLogin).toHaveBeenCalled();
    });

    it('should run #proceedRegister()', async () => {
        const jsdomAlert = window.alert;
        window.alert = () => {};
        component.service = component.service || {};
        component.service.proceedRegister = jest.fn().mockReturnValue(observableOf({}));
        component.proceedRegister({});
        window.alert = jsdomAlert;
        expect(component.service.proceedRegister).toHaveBeenCalled();
    });

    it('should run #submitLogin()', async () => {
        component.form = component.form || {};
        component.proceedLogin = jest.fn();
        component.submitLogin();
        expect(component.proceedLogin).toHaveBeenCalled();
    });

    it('should run #submitRegister()', async () => {
        component.form = component.form || {};
        component.proceedRegister = jest.fn();
        component.submitRegister();
        expect(component.proceedRegister).toHaveBeenCalled();
    });

});