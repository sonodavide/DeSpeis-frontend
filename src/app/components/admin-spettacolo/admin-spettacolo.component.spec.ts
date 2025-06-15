import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpettacoloComponent } from './admin-spettacolo.component';

describe('AdminSpettacoloComponent', () => {
  let component: AdminSpettacoloComponent;
  let fixture: ComponentFixture<AdminSpettacoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSpettacoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSpettacoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
