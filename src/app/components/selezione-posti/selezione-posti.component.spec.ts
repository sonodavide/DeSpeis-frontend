import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezionePostiComponent } from './selezione-posti.component';

describe('SelezionePostiComponent', () => {
  let component: SelezionePostiComponent;
  let fixture: ComponentFixture<SelezionePostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelezionePostiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelezionePostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
