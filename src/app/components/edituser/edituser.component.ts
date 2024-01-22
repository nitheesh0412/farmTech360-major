import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { dates } from 'src/app/models/cow';
import { User } from 'src/app/models/user';
import { CowsService } from 'src/app/services/cows.service';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EdituserComponent {
  hide: boolean = true;
  userData: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cowservice : CowsService,
    public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = this.fb.group({});
  }
  ngOnInit(): void {
    this.userData = this.fb.group({
      date: ['', [Validators.required]],
      check: ['', [Validators.required]],
    });
  }

  postUser(user: dates) {
    this.cowservice.updateCowVaccine(user,this.data).subscribe((data) => console.log(data));
    // this.dialogRef.close();
  }
}
