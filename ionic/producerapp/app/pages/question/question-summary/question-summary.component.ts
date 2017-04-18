import { Component  } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { IQuestion } from '../shared/question.schema';
import { QuestionService } from '../shared/question.service';

@Component({
  selector: 'question-summary',
  templateUrl: 'build/pages/question/question-summary/question-summary.component.html'
})
export class QuestionSummaryComponent { 
  private questions: Array<IQuestion> = [];

  constructor(
    private navParams: NavParams
  ) {
  }

  ngOnInit() {
    this.questions = this.navParams.get('questions');
  }
  
}