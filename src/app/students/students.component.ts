import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  
  students: Student[] = [];
  formGroupStudent: FormGroup;
  isEditing: boolean = false;
  
  constructor(private service: StudentService,
    private formBuilder: FormBuilder
  ){
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name : [''],
      course : [''],
    });
  }
  
  ngOnInit(): void {
    this.loadStudent();
  }
  
  loadStudent(){
    this.service.getAll().subscribe({
      next: json => this.students = json
    });
  }
  
  save() {
    this.service.save(this.formGroupStudent.value).subscribe(
      {
        next: json => {
          this.students.push(json);
          this.formGroupStudent.reset();
        }
      }
    )
  }
  
  delete(student: Student) {
    this.service.delete(student).subscribe(
      {
        next: () => this.loadStudent()
      }
    )
  }

  onClickUpdate(student: Student) {
    this.isEditing = true;
    this.formGroupStudent.setValue(student);
  }

  update() {
    this.service.update(this.formGroupStudent.value).subscribe({
      next: () => {
        this.loadStudent();
        this.clear();
      }
    }
    )
  }

  clear() {
    this.isEditing = false;
    this.formGroupStudent.reset();
  }
  
}
