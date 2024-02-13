import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SCM } from 'src/app/models/scm';
import { CowsService } from 'src/app/services/cows.service';




@Component({
  selector: 'app-disease-detection',
  templateUrl: './disease-detection.component.html',
  styleUrls: ['./disease-detection.component.scss']
})

export class DiseaseDetectionComponent implements OnInit {
  scm : FormGroup
  isClickedSCM : boolean = false;
  isClickedLSD : boolean = false;
  isSelectedSCM : boolean = false;
  isSelectedLSD : boolean = false;
  SCMPrediction : any
  constructor(private fb : FormBuilder,private cowService : CowsService){
    this.scm = this.fb.group({

    })
  }
  ngOnInit(): void {
      this.scm = this.fb.group({
        "DIM( Days In Milk)": ['',[Validators.required]],
        "Avg(7 days). Daily MY( L )": ['',[Validators.required]],
        "Kg. milk 305 ( Kg )": ['',[Validators.required]],
        "Fat (%)": ['',[Validators.required]],
        "SNF (%)": ['',[Validators.required]],
        "Density ( Kg/ m3": ['',[Validators.required]],
        "Protein (%)": ['',[Validators.required]],
        "Conductivity (mS/cm)": ['',[Validators.required]],
        "pH": ['',[Validators.required]],
        "Freezing point (⁰C)": ['',[Validators.required]],
        "Salt (%)": ['',[Validators.required]],
        "Lactose (%)": ['',[Validators.required]]
      });
  }
  SCMDetection(){
    this.isClickedSCM = true;
    this.isClickedLSD = false;
  }
  LSDDetection(){
    this.isClickedLSD = true;
    this.isClickedSCM = false;
  }
  onChange(e : any){
    file : File = e.target.files[0]
    
  }
  onUpload(){
    console.log()
  }
  predictSCM(data : SCM){
    console.log(data)
    this.isSelectedSCM = true;
    this.cowService.scmDetection(data).subscribe(data => {
      this.SCMPrediction = data
      console.log(this.SCMPrediction)
    });
  }
}
