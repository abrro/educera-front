import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Quiz } from 'src/app/models/model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css']
})
export class QuizInfoComponent implements OnInit {

  quizId! : number;
  quiz! : Quiz;
  userRole! : string | null;

  constructor(private quizService : QuizService, private authService : AuthenticationService, private route : ActivatedRoute,
    private router : Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    this.quizId = Number(this.route.snapshot.paramMap.get("id"));

    this.quizService.getQuizById(this.quizId).subscribe({
      next : (res) => {
        this.quiz = res;
      },
      error : (error) => {
        window.alert(error.message);
      }
    })
  }

  startQuiz() {
    this.quizService.startQuiz(this.quizId).subscribe({
      next : (res) => {
        this.quizService.accessedQuizQuestions = res.body.questions;
        this.quizService.timeRemaining = res.body.timeLeftSeconds;
        console.log(this.quizService.accessedQuizQuestions);
        this.router.navigateByUrl(`quiz/${this.quizId}/quiz-application`);
      },
      error : (error) => {
        window.alert(error.error);
      }
      }
    )
  }

  getResults() {
    this.quizService.getResults(this.quizId).subscribe({
        next : (res) => {
          if(res.body.quizParticipationState == "SUBMITTED"){
            this.router.navigateByUrl(`quiz/${this.quizId}/quiz-results`);
          }
        },
        error : (error) => {
          window.alert(error.error);
        }
      }
    )
  }

}
