import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DadosService } from '../dados.service';
import { Course } from '../course';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  formGroupCourse: FormGroup;

  constructor(private service: DadosService,
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
}
