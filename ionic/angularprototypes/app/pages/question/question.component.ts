import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { NavController } from'ionic-angular';

import { PagerComponent } from '../../shared/pager';

import { QuestionDetailsComponent } from './question-details';
import { QuestionSummaryComponent } from './question-summary';
import { QuestionService, IQuestion } from './shared';

@Component({
  selector: 'questions',
  templateUrl: 'build/pages/question/question.component.html',
  directives: [ QuestionDetailsComponent, PagerComponent ],
  providers: [ QuestionService ]
})
export class QuestionsComponent {

  private questions: IQuestion[];
  private slicedQuestions: IQuestion[] = [];
  itemPerPage: number = 1;
  private currentPage: number = 1;
  private totalItems: number;

  constructor(
    private questionService: QuestionService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.questions = this.questionService.getQuestions();
    this.totalItems = this.questions.length;
    this.onPageChange(0);
  }

  private onAnswerSelection(data: IQuestion) {
    // setting up answer value to question object.
    this.questions.filter((item) => item.id == data.id)
      .map(item => item.answer = data.answer);
    
    this.questionService.setAnswerForQuestion(data).then(res => {
      if (this.currentPage === this.questions.length - 1) {
        this.loadQuestionSummaryWindow();
      }
    });
  }

  private onPageChange(page) {
    this.currentPage = page;
    this.slicedQuestions = this.questions.slice(this.currentPage, this.currentPage + this.itemPerPage);
  }

  private loadQuestionSummaryWindow() {
    this.questionService.getAnswers().then(res => {
      this.navController.setRoot(QuestionSummaryComponent,
        { questions: res });
    });
  }
}