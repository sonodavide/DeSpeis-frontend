import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaTagComponent } from './cerca-tag.component';

describe('CercaTagComponent', () => {
  let component: CercaTagComponent;
  let fixture: ComponentFixture<CercaTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CercaTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CercaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
