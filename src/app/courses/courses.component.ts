import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  formGroupCourse: FormGroup;
  isEditing: boolean = false;

  constructor(private service: CourseService,
    private formBuilder: FormBuilder
  ){
    this.formGroupCourse = formBuilder.group({
      id: [''],
      name: [''],
      price: [''],
      active: [false],
      promotion: [false],
    });
  }

  ngOnInit(): void {
    this.service.getCourses().subscribe({
      next: json => this.courses = json
    });
  }

  loadCourse(){
    this.service.getCourses().subscribe({
      next: json => this.courses = json
    });
  }

  save(){
    this.service.saveCourse(this.formGroupCourse.value).subscribe(
      {
        next: json =>{
          this.courses.push(json);
          this.formGroupCourse.reset();
        }
      }
    )
  }

  delete(course: Course) {
    this.service.delete(course).subscribe(
      {
        next: () =>this.loadCourse()
      }
    )
  }

  clickUpdate(course: Course){
    this.isEditing = true;
    this.formGroupCourse.setValue(course);
  }

  update(){
    this.service.update(this.formGroupCourse.value).subscribe({
      next: () =>{
        this.loadCourse();
        this.clear();
      }
    })
  }

  clear(){
    this.isEditing = false;
    this.formGroupCourse.reset();
  }

}

