import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import {SocketService} from '../core/socket/socket.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  private socketSubscription: any;

  constructor(private socketService: SocketService) {
    this.socketSubscription = socketService.listen(environment.callCenterDataEmittedEventName).subscribe((data) => {
      console.log('data', data);
    });
  }

  itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.options = {
      itemChangeCallback: this.itemChange,
      itemResizeCallback: this.itemResize,
      draggable: {
        enabled: true
      },
      pushItems: true,
      resizable: {
        enabled: true
      }
    };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2}
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push();
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }

}
