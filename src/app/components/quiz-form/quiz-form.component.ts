import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { DatePipe } from '@angular/common';
import { Quiz } from 'src/app/models/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
  providers: [DatePipe]
})
export class QuizFormComponent implements OnInit{

  quizForm! : FormGroup;
  //0 = createform, 1 = editform
  mode! : number;
  quizId! : number;
  courseId! : number;
  submitted = false;
  quiz! : Quiz;
 
  constructor(private quizService : QuizService, private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute,
    private router : Router, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get("course_id"));

    this.quizForm = this.formBuilder.group({
      name : ['', Validators.required],
      rules : ['', Validators.required],
      startTime : ['', Validators.required],
      accessibleUntil : ['', Validators.required],
      duration : ['', Validators.required]
    });

    this.quizId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.mode = this.quizId;

    if(this.mode) {
      this.quizService.getQuizById(this.quizId).subscribe({
        next: (res) => {
          this.quiz = res;
          this.quizForm.patchValue(res);
        },
        error: (error) => {
          window.alert(error);
        }
      });
    }

  }

  get f(){
    return this.quizForm.controls;
  }

  submit() {
    this.submitted = true;
    if(this.quizForm.invalid) {
      return;
    }
    this.f['startTime'].setValue(this.transformDate(this.f['startTime'].value));
    this.f['accessibleUntil'].setValue(this.transformDate(this.f['accessibleUntil'].value));
    this.quiz = this.quizForm.value;
    if(this.mode){
      this.quiz.id = this.quizId;
      this.editQuiz(this.quiz);
    } else {
      this.createQuiz(this.quiz);
    }
  }

  createQuiz(quiz : Quiz) {
    this.quizService.createQuiz(quiz, this.courseId).subscribe(
      {
        next : (res) => {
          this.router.navigateByUrl(`/courses/${this.courseId}/quiz/${res.id}`);
        },
        error : (error) => {
          window.alert(error);
        }
      }
    );
  }

  editQuiz(quiz : Quiz) {
    this.quizService.editQuiz(quiz).subscribe(
      {
        next : (res) => {
          console.log(res);
          if(res.status == 200) {
            this.router.navigateByUrl(`/courses/${this.courseId}/quiz/${this.quiz.id}`);
          }
        },
        error : (error) => {
          window.alert(error);
        }
      }
    );

  }

  transformDate(date : string | null) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

}
