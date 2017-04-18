import { provide } from '@angular/core';
import {
  describe, expect, it, xit, inject, beforeEach, beforeEachProviders,
  setBaseTestProviders, async, resetBaseTestProviders
}  from '@angular/core/testing';
import {
  TestComponentBuilder, ComponentFixture
} from '@angular/compiler/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';

import { NavController } from 'ionic-angular';

resetBaseTestProviders();
setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

import { RatingComponent } from '../../shared/rating'

import { QuestionService } from './shared';

import { QuestionDetailsComponent } from './question-details';
import { QuestionsComponent } from './question.component';

declare const jasmine: any;

class NavControllerMock {
  push(comp: any) {
    return true;
  }
}

describe('Component: QuestionsComponent', () => {
  let fixture;
  // rc4 has some breaking changes which does not work with component is having templateUrl.
  let tempate = `
    <question *ngFor="let quest of slicedQuestions"
    [question]="quest"
    (onAnswerSelection)="onAnswerSelection($event);">
    </question>
  `;

  let questTemplate = `
  <div>
      {{quest?.text}}
    </div>
  `;

  beforeEachProviders(() => [
    provide(NavController, { useClass: NavControllerMock }),
    QuestionService
  ]);

  beforeEach(inject([ TestComponentBuilder ], (_tcb: TestComponentBuilder) => {
    fixture = _tcb
      .overrideTemplate(RatingComponent, `<p class="rating">1</p>`)
      .overrideTemplate(QuestionDetailsComponent, questTemplate).overrideTemplate(QuestionsComponent, tempate)
      .createAsync(QuestionsComponent);
  }))

  it('initially should be defined ', async(inject([], () => {
    fixture.then((compiledFixture) => {
      let el = compiledFixture.nativeElement;
      let ci = compiledFixture.debugElement.componentInstance;
      expect(el).toBeTruthy();
    });
  })));

  it('should populate question based on item per page provided  ', async(inject([], () => {
    fixture.then((compiledFixture) => {
      let el = compiledFixture.nativeElement;
      let ci = compiledFixture.debugElement.componentInstance;
      ci.itemPerPage = 5;
      compiledFixture.detectChanges();

      let renderedQuestions = el.querySelectorAll('question');
      expect(renderedQuestions.length).toBe(5);

      ci.itemPerPage = 3;
      ci.ngOnInit();
      compiledFixture.detectChanges();

      let newRenderedQuestions = el.querySelectorAll('question');
      expect(newRenderedQuestions.length).toBe(3);
    });
  })));
});