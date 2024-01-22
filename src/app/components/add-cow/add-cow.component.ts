import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { ICow, } from 'src/app/models/cow';
import { User } from 'src/app/models/user';
import { CowsService } from 'src/app/services/cows.service';

@Component({
  selector: 'app-add-cow',
  templateUrl: './add-cow.component.html',
  styleUrls: ['./add-cow.component.scss']
})
export class AddCowComponent {
  hide: boolean = true
  userData: FormGroup;
  
  constructor(private fb: FormBuilder,
    private cowService : CowsService) {
    this.userData = this.fb.group({

    })
  }
  ngOnInit(): void {
    this.userData = this.fb.group({
      id: ['', [Validators.required]],
      age: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),]],


    })
  }
  getErrorMessage() {

  }
  postCow(user : ICow) {
    this.cowService.postCow(user).subscribe((data : any) => console.log(data));
    
  }
}
