import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalaComponent } from './admin-sala.component';

describe('AdminSalaComponent', () => {
  let component: AdminSalaComponent;
  let fixture: ComponentFixture<AdminSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
