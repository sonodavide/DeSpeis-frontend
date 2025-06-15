import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenereComponent } from './admin-genere.component';

describe('AdminGenereComponent', () => {
  let component: AdminGenereComponent;
  let fixture: ComponentFixture<AdminGenereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGenereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
