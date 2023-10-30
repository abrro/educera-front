import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Quiz } from 'src/app/models/model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit{

  course : Course = {};
  quizzes : Quiz[] = [];
  tableColumns = ["name", "starts on", "accessible until"];

  userRole : string | null = '';
  teachersCourse : boolean | null = false;
  studentEnrolled: boolean | null = false;

  constructor(private courseService : CourseService, private route: ActivatedRoute,
    private authService : AuthenticationService, private router : Router){}

  ngOnInit(): void {

    this.userRole = this.authService.getUserRole();

    this.courseService.getCourse(this.route.snapshot.paramMap.get('id')).subscribe({
      next: (res) => {
        this.course = res;
        
        if(this.userRole == "STUDENT") {
          this.isStudentEnrolled();
        }
        if(this.userRole == "TEACHER") {
          if(this.authService.getUserEmail() == this.course.teacher?.email) {
            this.teachersCourse = true;
          }
          this.getQuizzes();
        }
        
      },
      error: (error) => {
        window.alert(error);
      }
    });

  }

  isStudentEnrolled() {
    this.courseService.isStudentEnrolled(this.course.id).subscribe({
      next : (res) => {
        if(res.status == 200){
          this.studentEnrolled = true;
          this.getQuizzes();
        }
      },
      error : (error) => {
        window.alert(error.error);
      },
    })
    
  }

  getQuizzes() {
    this.courseService.getCourseQuizzes(this.course.id).subscribe({
      next : (res) => {
        this.quizzes = res;
      },
      error : (error) => {
        window.alert(error.error);
      }
    })
  }

  enrollStudent() {
    this.courseService.enrollStudent(this.course.id).subscribe({
      next : (res) => {
        window.alert("Successfully enrolled on this course.");
        this.getQuizzes();
        this.studentEnrolled = true;
      },
      error : (error) => {
        window.alert(error.error);
      }
    })
  }

}
