import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bp',
  templateUrl: './add-bp.component.html',
  styleUrls: ['./add-bp.component.css']
})
export class AddBPComponent implements OnInit {
  errorMessage;
  boiteForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,

  ) { }
  ngOnInit() {
    this.initForm();
    //  this.compS.getCompany(localStorage.getItem('id')).subscribe(
    //  (data) => this.user = data
    // );
  }
  initForm() {
    this.boiteForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
  onSubmit(): void {
    //
  }

}
