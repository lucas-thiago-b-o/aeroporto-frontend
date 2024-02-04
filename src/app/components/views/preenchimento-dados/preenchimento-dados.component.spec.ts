import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreenchimentoDadosComponent } from './preenchimento-dados.component';

describe('PreenchimentoDadosComponent', () => {
  let component: PreenchimentoDadosComponent;
  let fixture: ComponentFixture<PreenchimentoDadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PreenchimentoDadosComponent]
    });
    fixture = TestBed.createComponent(PreenchimentoDadosComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`maskRG has default value`, () => {
    expect(component.maskRG).toEqual([
      /\d/,
      /\d/,
      `.`,
      /\d/,
      /\d/,
      /\d/,
      `.`,
      /\d/,
      /\d/,
      /\d/,
      `-`,
      /\d/
    ]);
  });

  it(`maskCPF has default value`, () => {
    expect(component.maskCPF).toEqual([
      /\d/,
      /\d/,
      /\d/,
      `.`,
      /\d/,
      /\d/,
      /\d/,
      `.`,
      /\d/,
      /\d/,
      /\d/,
      `-`,
      /\d/,
      /\d/
    ]);
  });

  it(`maskData has default value`, () => {
    expect(component.maskData).toEqual([
      /\d/,
      /\d/,
      `/`,
      /\d/,
      /\d/,
      `/`,
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ]);
  });

  it(`maskTelefone has default value`, () => {
    expect(component.maskTelefone).toEqual([
      `(`,
      /[1-9]/,
      /\d/,
      `)`,
      ` `,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      `-`,
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ]);
  });
});
