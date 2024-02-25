import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { IVaccine } from 'src/app/models/cow';
import { CowsService } from 'src/app/services/cows.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { EdituserComponent } from '../edituser/edituser.component';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit, AfterViewInit {
  vaccinedata: FormGroup;
  vaccineList : any = []
  isClicked : boolean = false
  cows : any
  selected = 'none';
  displayedColumns: string[] = ['id', 'vaccineName', 'doses', 'time interval','vaccination','add'];
  dataSource = new MatTableDataSource([]);
  constructor(private fb : FormBuilder,
    private cowService : CowsService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private vaccineService : VaccineService,
    private toastr: ToastrService){
    this.vaccinedata = this.fb.group({

    })
  }

  ngOnInit(): void {
    this.subscribeVaccineData()
    this.vaccinedata = this.fb.group({
      ids : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)
      ]],
      vaccine_name : ['',[Validators.required]],
      doses : ['',[Validators.required]],
      timeInterval : ['',[Validators.required]],
      date : ['',[Validators.required]],
      status : ['',[Validators.required]]
    })

    this.subscribeUsers();


  }
  @ViewChild(MatSort) sort! : MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  subscribeUsers(){
    this.cowService.getCows().subscribe((cowdata : any) => {
      this.cowService.allCows = cowdata
      this.cows = cowdata
      console.log(this.cows)
    }
    )
  }

  subscribeVaccineData(){
    this.cowService.getVaccinedata().subscribe((vaccinedata: any) => {
      this.vaccineList = vaccinedata;
      for(let vaccine of this.vaccineList){
        for(let val of vaccine.status){
          val.date = this.datepipe.transform(val.date, 'dd-MM-YYYY');
        }
      }
      this.dataSource = new MatTableDataSource(this.vaccineList);
      console.log(this.dataSource)
    })
  }

  postvaccine(data : any){
  
    const vaccine : IVaccine = {
      id: data.ids,
      vaccine_name: data.vaccine_name,
      doses: data.doses,
      timeinterval: data.timeInterval,
      status: [{
        date : data.date,
        check : data.status
      }]
    }
    console.log(vaccine)
    this.isClicked = false
    this.cowService.updateVaccine(vaccine).subscribe(data => console.log(data));
  }

  onClick(){
    this.isClicked = true
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialogedit(idNo: number): void {

    this.cowService.getVaccineByID(String(idNo)).subscribe((data : any) => {
      if(data.doses > data.status.length){
        this.cowService.getVaccinedata().subscribe((data: any) => {

          const dialogRef = this.dialog.open(EdituserComponent, {
            data: idNo,
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.subscribeUsers();
          });
        }
        )
      } else {
        this.toastr.error('wrong information', 'you are trying to add vaccine data greater than doses')
      }
    })

    
  }
  
}
