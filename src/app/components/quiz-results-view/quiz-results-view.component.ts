import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionResponse, Quiz } from 'src/app/models/model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-results-view',
  templateUrl: './quiz-results-view.component.html',
  styleUrls: ['./quiz-results-view.component.css']
})
export class QuizResultsViewComponent implements OnInit {

  quizId! : number;
  quiz!: Quiz;
  responses!: QuestionResponse[];
  pointsWon! : number;

  constructor(private quizService : QuizService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get("id"));
    this.quizService.getResults(this.quizId).subscribe({
        next : (res) => {
          this.responses = res.body.questionResponses;
          this.quiz = res.body.quiz;
          this.pointsWon = res.body.totalPoints;
        },
        error : (error) => {
          window.alert(error.error);
        }
      }
    )
  }

  getAnswerIndex(selectedIds : string | undefined, index : number) {
    let ids = selectedIds?.split(",");
    return ids?.map(id => this.responses[index].question?.questionAnswers.findIndex(a => a.id == Number(id))! + 1).join(",");
  }

}
