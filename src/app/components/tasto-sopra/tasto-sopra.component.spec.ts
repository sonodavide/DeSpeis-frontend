import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastoSopraComponent } from './tasto-sopra.component';

describe('TastoSopraComponent', () => {
  let component: TastoSopraComponent;
  let fixture: ComponentFixture<TastoSopraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TastoSopraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TastoSopraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
