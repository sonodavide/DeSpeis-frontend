import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmComponent } from './admin-film.component';

describe('AdminFilmComponent', () => {
  let component: AdminFilmComponent;
  let fixture: ComponentFixture<AdminFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
