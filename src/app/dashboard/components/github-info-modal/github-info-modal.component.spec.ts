import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubInfoModalComponent } from './github-info-modal.component';

describe('GithubInfoModalComponent', () => {
  let component: GithubInfoModalComponent;
  let fixture: ComponentFixture<GithubInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
