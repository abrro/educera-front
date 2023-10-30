import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { ChoiceQuestionFormComponent } from './components/choice-question-form/choice-question-form.component';
import { ShortAnswerQuestionFormComponent } from './components/short-answer-question-form/short-answer-question-form.component';
import { QuizManagementViewComponent } from './components/quiz-management-view/quiz-management-view.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { teacherAllowedGuard } from './guards/teacher-allowed.guard';
import { QuizApplicationComponent } from './components/quiz-application/quiz-application.component';
import { QuizResultsViewComponent } from './components/quiz-results-view/quiz-results-view.component';
import { studentsAllowedGuard } from './guards/students-allowed.guard';

const routes: Routes = [
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "courses",
    component : CoursesComponent
  },
  {
    path : "courses/:id",
    component : CourseViewComponent,
  },
  {
    path : "courses/:course_id/quiz-info/:id",
    component : QuizInfoComponent
  },
  {
    path : "courses/:course_id/quiz/create",
    component : QuizFormComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "courses/:course_id/quiz/:id/edit",
    component : QuizFormComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "courses/:course_id/quiz/:quiz_id",
    component : QuizManagementViewComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "courses/:course_id/quiz/:quiz_id/cq/create",
    component : ChoiceQuestionFormComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "courses/:course_id/quiz/:quiz_id/edit-cq/:id",
    component : ChoiceQuestionFormComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "courses/:course_id/quiz/:quiz_id/saq/create",
    component : ShortAnswerQuestionFormComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "courses/:course_id/quiz/:quiz_id/edit-saq/:id",
    component : ShortAnswerQuestionFormComponent,
    canActivate : [teacherAllowedGuard]
  },
  {
    path : "quiz/:id/quiz-application",
    component : QuizApplicationComponent,
    canActivate : [studentsAllowedGuard]
  },
  {
    path : "quiz/:id/quiz-results",
    component : QuizResultsViewComponent,
    canActivate : [studentsAllowedGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
