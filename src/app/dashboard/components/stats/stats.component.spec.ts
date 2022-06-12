import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatsComponent } from './stats.component';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('repoForm should be invalid after touched', () => {
    let form = component.repoFormControl;
    form.markAsTouched();
    expect(form.valid).toBeFalsy();
  });

  it('repoForm should be valid after setting value', () => {
    let form = component.repoFormControl;
    form.setValue({ id: 123, name: 'test' });
    expect(form.valid).toBeTruthy();
  });
});
