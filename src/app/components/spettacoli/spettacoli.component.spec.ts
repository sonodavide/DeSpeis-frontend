import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpettacoliComponent } from './spettacoli.component';

describe('SpettacoliComponent', () => {
  let component: SpettacoliComponent;
  let fixture: ComponentFixture<SpettacoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpettacoliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpettacoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
