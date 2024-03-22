import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CowsService } from 'src/app/services/cows.service';

@Component({
  selector: 'app-cowlist',
  templateUrl: './cowlist.component.html',
  styleUrls: ['./cowlist.component.scss'],
})
export class CowlistComponent implements OnInit{
  cows: any;
  displayedColmns: string[] = ['id', 'sex', 'age'];
  dataSource = new MatTableDataSource([]);
  constructor(private cowService: CowsService,private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,) {}
  ngOnInit(): void {
      this.subscribeUsers();
  }
  @ViewChild(MatSort) sort! : MatSort;
  subscribeUsers() {
    this.cowService.getCows().subscribe((cowdata: any) => {
      this.cowService.allCows = cowdata;
      this.cows = cowdata;
      this.dataSource = new MatTableDataSource(cowdata);
      console.log(this.cows);
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
