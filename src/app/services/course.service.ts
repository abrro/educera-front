import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, Quiz } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly baseUrl = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  getAllCourses() : Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseUrl}/courses/all`);
  }

  getCourse(id : string | null) : Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  getCourseQuizzes(course_id : number | undefined) : Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>(`${this.baseUrl}/quizzes/course/${course_id}`);
  }

  isStudentEnrolled(course_id: number | undefined) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/courses/${course_id}/enrolled`, {
      observe : "response"
    });
  }

  enrollStudent(course_id: number | undefined) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/courses/${course_id}/enroll`, {
      observe : "response"
    });
  }

  unlistStudent(course_id: number | undefined) : Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/courses/${course_id}/unlist`, {
      observe : "response"
    });
  }

}
