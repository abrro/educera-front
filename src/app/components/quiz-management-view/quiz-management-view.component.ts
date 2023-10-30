import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Quiz } from 'src/app/models/model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-management-view',
  templateUrl: './quiz-management-view.component.html',
  styleUrls: ['./quiz-management-view.component.css']
})
export class QuizManagementViewComponent implements OnInit{

  quiz : Quiz = {};
  questions : Question[] = [];
  qTypeChoice : boolean = false;
  qTypes = [
    {label : "Multi-choice question", alias: "CQ"}, 
    {label : "Short-answer question", alias: "SAQ"}
  ];
  courseId! : number;
  qTypeSelected : any;
  tableColumns = ["Question name", "Type", "Action"];
 
  constructor(private quizService : QuizService, private questionService : QuestionService, private route : ActivatedRoute,
    private router : Router) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get("course_id"));
    this.quizService.getQuizById(Number(this.route.snapshot.paramMap.get("quiz_id"))).subscribe({
        next : (res) => {
          this.quiz = res;
          this.questionService.getQuestionsByQuizId(this.quiz.id).subscribe({
            next : (res) => {this.questions = res},
            error: (error) => {window.alert(error)}
          })
        },
        error: (error) => {
          window.alert(error)
        }
      }
    )
  }

  toggleQuestionTypeChoice() {
    this.qTypeChoice = !this.qTypeChoice;
    this.qTypeSelected = null;
  }

  openQuestionForm() {
    switch(this.qTypeSelected){
      case "CQ" : {
        this.router.navigateByUrl(`courses/${this.courseId}/quiz/${this.quiz.id}/cq/create`);
        break;
      }
      case "SAQ" : {
        this.router.navigateByUrl(`courses/${this.courseId}/quiz/${this.quiz.id}/saq/create`);
        break;
      }
    }
  }

  deleteQuestion(id : number | undefined, index : number) {
    this.questionService.deleteById(id).subscribe({
      next : (res) => {
        if(res.status == 200) {
          this.questions.splice(index, 1);
        }
      },
      error : (error) => {
        window.alert(error.error);
      }
    }) 
  }

}
