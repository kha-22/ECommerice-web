import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppratingComponent } from './apprating.component';

describe('AppratingComponent', () => {
  let component: AppratingComponent;
  let fixture: ComponentFixture<AppratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
