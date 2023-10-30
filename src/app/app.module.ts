import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { ApplicationComponent } from './components/application/application.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizManagementViewComponent } from './components/quiz-management-view/quiz-management-view.component';
import { QuizApplicationComponent } from './components/quiz-application/quiz-application.component';
import { QuizResultsViewComponent } from './components/quiz-results-view/quiz-results-view.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { ChoiceQuestionFormComponent } from './components/choice-question-form/choice-question-form.component';
import { ShortAnswerQuestionFormComponent } from './components/short-answer-question-form/short-answer-question-form.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    CoursesComponent,
    LoginComponent,
    CoursesComponent,
    CourseViewComponent,
    QuizFormComponent,
    QuizInfoComponent,
    QuizManagementViewComponent,
    QuizApplicationComponent,
    QuizResultsViewComponent,
    ChoiceQuestionFormComponent,
    ShortAnswerQuestionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [ApplicationComponent]
})
export class AppModule { }
