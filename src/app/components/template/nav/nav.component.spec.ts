import { ComponentFixture, TestBed} from '@angular/core/testing';
import {
    Pipe,
    PipeTransform,
    Injectable,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
    Directive,
    Input,
    Output
} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NavComponent} from './nav.component';
import {AuthService} from '../../../service/auth.service';

@Injectable()
class MockAuthService {
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

describe('NavComponent', () => {
    let fixture: ComponentFixture<NavComponent>;
    let component: { ngOnDestroy: () => void; ngOnInit: () => void; service: { loggingOut?: any; }; logout: () => void; };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule ],
            declarations: [
                NavComponent,
                TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
                MyCustomDirective
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
            providers: [
                { provide: AuthService, useClass: MockAuthService }
            ]
        }).overrideComponent(NavComponent, {

        }).compileComponents();
        fixture = TestBed.createComponent(NavComponent);
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

    it('should run #logout()', async () => {
        component.service = component.service || {};
        component.service.loggingOut = jest.fn();
        component.logout();
        expect(component.service.loggingOut).toHaveBeenCalled();
    });

});