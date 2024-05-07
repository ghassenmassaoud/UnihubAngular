import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      file: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event?.target?.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileControl = this.form.get('file');
      if (fileControl) {
        fileControl.setValue(file);
      }
    }
  }
  initForm() {
    this.form.reset(); 
  }

  uploadFile() {
    const fileControl = this.form.get('file');
    if (!fileControl || !fileControl.value) {
      console.error('No file selected.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', fileControl.value);
  
    this.http.post<any>('http://localhost:4200/upload', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}  
