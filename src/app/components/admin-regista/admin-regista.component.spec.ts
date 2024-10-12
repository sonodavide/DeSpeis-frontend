import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistaComponent } from './admin-regista.component';

describe('AdminRegistaComponent', () => {
  let component: AdminRegistaComponent;
  let fixture: ComponentFixture<AdminRegistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRegistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
