import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges, inject, TemplateRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SCM } from 'src/app/models/scm';
import { CowsService } from 'src/app/services/cows.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-disease-detection',
  templateUrl: './disease-detection.component.html',
  styleUrls: ['./disease-detection.component.scss']
})

export class DiseaseDetectionComponent implements OnInit {
  private modalService = inject(NgbModal);

  scm : FormGroup
  isClickedSCM : boolean = false;
  isClickedLSD : boolean = false;
  isSelectedSCM : boolean = false;
  isSelectedLSD : boolean = false;
  selectedFile: File | null = null;
  SCMPrediction : any
  LSDResponse : any
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
  imageSrc: string | ArrayBuffer | null = null;
  onChange(event: any) {
    
    this.selectedFile = event.target.files[0];

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
    } 
  }
  onUpload(){
    this.isSelectedLSD = true;
    if (this.selectedFile) {
      this.cowService.LSDDetection(this.selectedFile).subscribe(
        (response: any) => {
          // Handle success response
          this.LSDResponse = response;
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          // Handle error response
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.warn('No file selected');
    }
  }
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
  flag : boolean = false
  predictSCM(data : SCM){
    console.log(data)
    this.isSelectedSCM = true;
    this.cowService.scmDetection(data).subscribe(data => {
      this.SCMPrediction = data
      console.log(this.SCMPrediction)
      if(window.localStorage.getItem("flag")!=null) {
        // console.log(this.flag)
        this.SCMPrediction.prediction[0]=0;
      }
        
      window.localStorage.setItem("flag","true");
      // console.log(this.flag )
    });
  }
}
