import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  private readonly baseUrl = "http://localhost:8080"

  constructor(private httpClient : HttpClient) { }

  getQuestionsByQuizId(quiz_id: number | undefined) : Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.baseUrl}/questions/quiz/${quiz_id}`);
  }

  getQuestionById(questionId: number) : Observable<Question> {
    return this.httpClient.get<Question>(`${this.baseUrl}/questions/${questionId}`);
  }
  createQuestion(question: Question, quizId: number) {
    return this.httpClient.post<Question>(`${this.baseUrl}/questions?quiz_id=${quizId}`, question);
  }
  editQuestion(question: Question) {
    return this.httpClient.put<any>(`${this.baseUrl}/questions/${question.id}`, question,
      {
        observe : "response"
      }
    );
  }
  deleteById(id: number | undefined) : Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/questions/${id}`, {
      observe : "response"
    })
  }
}
