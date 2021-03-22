import { Component } from '@angular/core';

import { UploadFilesService } from 'src/app/services/upload-files.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html'
})
export class UploadFilesComponent{
  rows: any;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
    
  constructor(
    private http: HttpClient, 
    private uploadFilesService: UploadFilesService
    ) { }
      
  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
     
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
   
    this.uploadFilesService.upload(formData).subscribe(
      res => {
        if (res instanceof HttpResponse) {
          this.rows = res.body;
        }
      }
    );
  }
}