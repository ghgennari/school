import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  
  constructor(private http: HttpClient) {}
  
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
  
  saveCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  
  }
  delete(course: Course): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${course.id}`);
  }

  update(course: Course) : Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${course.id}`,course);
  }

}
