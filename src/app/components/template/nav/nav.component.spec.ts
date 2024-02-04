import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({ loggingOut: () => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavComponent],
      providers: [{ provide: AuthService, useFactory: authServiceStub }]
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'loggingOut').and.callThrough();
      component.logout();
      expect(authServiceStub.loggingOut).toHaveBeenCalled();
    });
  });
});
