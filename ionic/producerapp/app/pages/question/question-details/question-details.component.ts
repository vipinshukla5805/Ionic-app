import { Component, Input, Output, EventEmitter } from '@angular/core';

import { RatingComponent } from '../../../shared/rating';

import { IQuestion } from '../shared';

import { ProfileComponent } from '../../../shared'

@Component({
  selector: 'question',
  templateUrl: 'build/pages/question/question-details/question-details.component.html',
  directives: [ RatingComponent, ProfileComponent ]
})
export class QuestionDetailsComponent {

  private Url:string;
  
  @Input() question: IQuestion;

  @Output() onAnswerSelection: EventEmitter<IQuestion>
  = new EventEmitter<IQuestion>();

  private defaultQuestion: IQuestion = {
    id: '',
    text: '',
    type: 'Rating',
    answer: 0
  }

  ngOnInit() { 
    this.question = Object.assign({}, this.defaultQuestion, this.question);
  }

  private onSelection(data) {
    this.question.answer = data;
    this.onAnswerSelection.next(this.question);
  }
}