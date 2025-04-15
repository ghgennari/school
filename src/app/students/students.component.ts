import { Component, OnInit } from '@angular/core';
import { DadosService } from '../dados.service';
import { Student } from '../student';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  
  constructor(private service: DadosService){}

  ngOnInit(): void {
      this.service.getStudents().subscribe({
        next: json => this.students = json
      })
  }




  

}
