import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageStatsComponent } from './language-stats.component';

describe('LanguageStatsComponent', () => {
  let component: LanguageStatsComponent;
  let fixture: ComponentFixture<LanguageStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
