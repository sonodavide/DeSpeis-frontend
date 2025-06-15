import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUtenteComponent } from './admin-utente.component';

describe('AdminUtenteComponent', () => {
  let component: AdminUtenteComponent;
  let fixture: ComponentFixture<AdminUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
