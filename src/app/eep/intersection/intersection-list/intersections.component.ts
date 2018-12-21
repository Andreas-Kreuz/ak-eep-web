import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Intersection} from '../models/intersection.model';
import * as fromRoot from '../../../app.reducers';
import * as fromIntersection from '../../intersection/store/intersection.reducers';
import * as IntersectionAction from '../store/intersection.actions';
import {CamHelpDialogComponent} from '../../cam/cam-help-dialog/cam-help-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crossings',
  templateUrl: './intersections.component.html',
  styleUrls: ['./intersections.component.css']
})
export class IntersectionsComponent implements OnInit {
  intersections$: Observable<Intersection[]>;

  constructor(private store: Store<fromRoot.State>,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.intersections$ = this.store.pipe(select(fromIntersection.intersections$));
  }

  trackById(index: number, intersection: Intersection) {
    if (!intersection) return null;
    return intersection.id;
  }

  activateCam(staticCam: string) {
    if (staticCam) {
      this.store.dispatch(new IntersectionAction.SwitchToCam({
        staticCam: staticCam
      }));
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CamHelpDialogComponent, {
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  redirect(intersection: Intersection) {
    this.router.navigateByUrl('/intersections/' + intersection.id);
  }
}
