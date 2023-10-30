import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ObservableInput, Subscription, map, takeWhile, timer } from 'rxjs';
import { QuestionResponseDto, Question } from 'src/app/models/model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-application',
  templateUrl: './quiz-application.component.html',
  styleUrls: ['./quiz-application.component.css'],
  providers: [DatePipe, AsyncPipe]
})
export class QuizApplicationComponent implements OnInit {

  questions! : Question[];
  quizId! : number;

  responses : QuestionResponseDto[] = [];
  value = false;
  timeRemaining$!: Observable<number>;

  constructor(private quizService : QuizService, private route : ActivatedRoute, private router : Router) {}
 
  ngOnInit(): void {

    this.questions = this.quizService.accessedQuizQuestions;
    this.quizId = Number(this.route.snapshot.paramMap.get("id"));

    if(!this.questions.length){
      this.quizService.startQuiz(this.quizId).subscribe({
        next: (res) => {
          this.questions = res.body.questions;

          this.timeRemaining$ = timer(0, 1000).pipe(
            map(n => 1000*(res.body.timeLeftSeconds - n)),
            takeWhile(n => n >= 0),
          )

          this.timeRemaining$.subscribe({
            complete: () => {
              this.sumbitResponses();
            }
          })
          
          this.fillResponseDtoArray();
        },
        error: (error) => {
          window.alert(error.error);
        }
      })
    } else {
      this.fillResponseDtoArray();
      this.timeRemaining$ = timer(0, 1000).pipe(
        map(n => 1000*(this.quizService.timeRemaining - n)),
        takeWhile(n => n >= 0),
      )

      this.timeRemaining$.subscribe({
        complete: () => {
          this.sumbitResponses();
        }
      })
    }

    
  }

  appendSelected(id : number | undefined, index : number, event : any) {
    if(event.target.checked === true) {
      if(this.responses[index].response == '') {
        this.responses[index].response = this.responses[index].response?.concat(String(id));
      } else {
        this.responses[index].response = this.responses[index].response?.concat("," + id);
      }
    }
    if(event.target.checked === false) {
      this.responses[index].response =this.responses[index].response?.split(',').filter(r => Number(r) != id).join(',');
    }
    //console.log(this.responses[index].response);
  }

  checkOne(id : number | undefined, index : number) {
    this.responses[index].response = String(id);
    //console.log(this.responses[index].response);
  }

  sumbitResponses() {
    this.quizService.sumbitAnswers(this.responses, this.quizId).subscribe({
      next: (res) => {
        if(res.status == 200) {
          this.router.navigateByUrl(`/quiz/${this.quizId}/quiz-results`);
        }
      },
      error: (error) => {
        window.alert(error.error);
      }
    });
  }

  fillResponseDtoArray() {
    for(let i=0; i < this.questions.length; i++) {
      this.responses.push(
        {
          question_id : this.questions.at(i)?.id,
          response : ''
        }
      );
    }
  }
}
