import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChatComponent } from './test-chat.component';

describe('TestChatComponent', () => {
  let component: TestChatComponent;
  let fixture: ComponentFixture<TestChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
