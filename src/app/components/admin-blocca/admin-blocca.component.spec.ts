import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloccaComponent } from './admin-blocca.component';

describe('AdminBloccaComponent', () => {
  let component: AdminBloccaComponent;
  let fixture: ComponentFixture<AdminBloccaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBloccaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBloccaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
