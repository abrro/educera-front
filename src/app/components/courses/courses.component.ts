import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  courses : Course[] = [];

  constructor(private courseService : CourseService) {

  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next : (res) => {
        this.courses = res;
      },
      error : (error) => {
        window.alert(error);
      }
    })
    
  }

}
