import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl);
  }

  save(student: Student): Observable<Student>{
    return this.http.post<Student>(this.apiUrl, student);
  }

  delete(student:Student): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${student.id}`);
  }
  
  update(student: Student) : Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`,student);
  }
}
