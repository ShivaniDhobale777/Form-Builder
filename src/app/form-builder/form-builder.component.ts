import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  formFields: any[] = [];  // To hold dynamic form fields
  fieldTypes = ['computer', 'science', 'arts', 'electrical', 'Commerce'];  // Available field types
  formBuilder!: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formBuilder = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      mobile: ['', Validators.required],
      fieldType: [''],
      gender: ['']
    });
  }



  get Name() {
    return this.formBuilder.controls['Name']
  }

  get Surname() {
    return this.formBuilder.controls['Surname']
  }


  get mobile() {
    return this.formBuilder.controls['mobile']
  }


  get fieldType() {
    return this.formBuilder.controls['fieldType']
  }




  submit(form: any) {
    // alert("Form submitted successfully");
    this.dialog.open(DynamicFormComponent);

    console.log('Form Fields:', form.value);
  }

}
