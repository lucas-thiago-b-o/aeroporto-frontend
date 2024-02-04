import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreenchimentoAssentoComponent } from './preenchimento-assento.component';

describe('PreenchimentoAssentoComponent', () => {
  let component: PreenchimentoAssentoComponent;
  let fixture: ComponentFixture<PreenchimentoAssentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PreenchimentoAssentoComponent]
    });
    fixture = TestBed.createComponent(PreenchimentoAssentoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`assentosSelecionados has default value`, () => {
    expect(component.assentosSelecionados).toEqual([]);
  });
});
