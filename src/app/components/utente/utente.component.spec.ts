import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteComponent } from './utente.component';

describe('UtenteComponent', () => {
  let component: UtenteComponent;
  let fixture: ComponentFixture<UtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
