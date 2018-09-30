import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnleashedComponent } from './unleashed.component';

describe('UnleashedComponent', () => {
  let component: UnleashedComponent;
  let fixture: ComponentFixture<UnleashedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnleashedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnleashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
