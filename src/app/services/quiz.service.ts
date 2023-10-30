import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, QuestionResponseDto, Quiz } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly baseUrl = "http://localhost:8080"

  accessedQuizQuestions : Question[] = [];
  timeRemaining!: number;

  constructor(private httpClient : HttpClient) { }

  getQuizById(quizId: number | null) : Observable<Quiz> {
    return this.httpClient.get<Quiz>(`${this.baseUrl}/quizzes/${quizId}`);
  }

  createQuiz(quiz : Quiz, course_id : number) : Observable<Quiz> {
    return this.httpClient.post<Quiz>(`${this.baseUrl}/quizzes?course_id=${course_id}`, quiz);
  }

  editQuiz(quiz : Quiz) : Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/quizzes/${quiz.id}`, quiz,
      {
        observe : "response"
      }
    );
  }

  startQuiz(quizId: number) : Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/quizzing/enter/${quizId}`,
      {
        observe : "response"
      }
    );
  }

  sumbitAnswers(responses : QuestionResponseDto[], quizId : number) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/quizzing/submit/${quizId}`, responses,
      {
        observe : "response"
      }
    );
  }

  getResults(quizId : number) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/quizzing/results/${quizId}`,
      {
        observe : "response"
      }
    );
  }
}
