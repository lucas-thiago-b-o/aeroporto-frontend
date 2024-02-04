import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({
      proceedLogin: object => ({ subscribe: f => f({}) }),
      proceedRegister: formValue => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('submitLogin', () => {
    it('makes expected calls', () => {
      spyOn(component, 'proceedLogin').and.callThrough();
      component.submitLogin();
      expect(component.proceedLogin).toHaveBeenCalled();
    });
  });

  describe('submitRegister', () => {
    it('makes expected calls', () => {
      spyOn(component, 'proceedRegister').and.callThrough();
      component.submitRegister();
      expect(component.proceedRegister).toHaveBeenCalled();
    });
  });
});
