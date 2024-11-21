import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteHomepageComponent } from './utente-homepage.component';

describe('UtenteHomepageComponent', () => {
  let component: UtenteHomepageComponent;
  let fixture: ComponentFixture<UtenteHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtenteHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtenteHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
