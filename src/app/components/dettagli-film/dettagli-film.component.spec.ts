import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliFilmComponent } from './dettagli-film.component';

describe('DettagliFilmComponent', () => {
  let component: DettagliFilmComponent;
  let fixture: ComponentFixture<DettagliFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettagliFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettagliFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
