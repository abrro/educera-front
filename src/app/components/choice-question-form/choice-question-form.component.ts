import { PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-choice-question-form',
  templateUrl: './choice-question-form.component.html',
  styleUrls: ['./choice-question-form.component.css'],
  providers: [PercentPipe]
})
export class ChoiceQuestionFormComponent implements OnInit{

  questionForm! : FormGroup;
  question!: Question;
  questionId! : number;
  courseId! : number;
  quizId! : number;
  //0 -create, 1-edit
  mode! : number;
  submitted = false;
  percentages = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1];
  singleTypeSelected : boolean = false;

  constructor(private questionService : QuestionService, private formBuilder : FormBuilder,
     private route: ActivatedRoute, private router : Router) {}

  ngOnInit(): void {

    this.courseId = Number(this.route.snapshot.paramMap.get("course_id"));
    this.quizId = Number(this.route.snapshot.paramMap.get("quiz_id"));

    this.questionForm = this.formBuilder.group({
      title : ['', Validators.required],
      text : ['', Validators.required],
      maximumPoints : ['', Validators.required],
      questionAnswers : this.formBuilder.array([])
    });

    this.questionId = Number(this.route.snapshot.paramMap.get("id"));
    this.mode = this.questionId;

    if(this.mode) {
      this.questionService.getQuestionById(this.questionId).subscribe({
        next: (res) => {
          this.question = res;
          this.questionForm.patchValue(res);
          if(this.question.questionType == 'SINGLE_CHOICE'){
            this.singleTypeSelected = true;
          }
          if(res.questionAnswers.length){
            res.questionAnswers.forEach(a => {
              this.addAnswerForm();
            })
            this.answers.patchValue(res.questionAnswers);
          }
        },
        error: (error) => {
          window.alert(error);
        }
      });
    } else {
      for (let i = 0; i < 3; i++) {
        this.addAnswerForm();
      }
    }
  }

  get f(){
    return this.questionForm.controls;
  }

  get answers() {
    return this.questionForm.controls['questionAnswers'] as FormArray | any;
  }

  addAnswerForm() {
    const answerForm = this.formBuilder.group({ 
        answer : ['', Validators.required],
        percentageValue: ['', Validators.required] 
      }
    )
    this.answers.push(answerForm);
  }

  removeAnswer(index: number) {
      this.answers.removeAt(index);
  }

  toggleType() {
    this.singleTypeSelected = !this.singleTypeSelected;
    console.log(this.singleTypeSelected);
  }

  submit() {
    this.submitted = true;
    if(this.questionForm.invalid) {
      return;
    }
    this.question = this.questionForm.value;
    console.log(this.question);
    
    if(this.singleTypeSelected){
      this.question.questionType = "SINGLE_CHOICE";
    } else {
      this.question.questionType = "MULTI_CHOICE";
    }
    
    if(this.mode){
      this.question.id = this.questionId;
      this.editQuestion(this.question);
    } else {
      this.createQuestion(this.question);
    }

  }

  createQuestion(question : Question) {
    this.questionService.createQuestion(question, this.quizId).subscribe(
      {
        next : (res) => {
          this.router.navigateByUrl(`courses/${this.courseId}/quiz/${this.quizId}`);
        },
        error : (error) => {
          window.alert(error);
        }
      }
    );
  }

  editQuestion(question : Question) {
    this.questionService.editQuestion(question).subscribe(
      {
        next : (res) => {
          if(res.status == 200) {
            this.router.navigateByUrl(`courses/${this.courseId}/quiz/${this.quizId}`);
          }
        },
        error : (error) => {
          window.alert(error);
        }
      }
    );

  }
  

}
