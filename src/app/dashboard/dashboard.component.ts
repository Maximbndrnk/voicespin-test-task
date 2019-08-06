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

  callStatuses = {
    IDLE: 'IDLE',
    IN_CALL: 'IN CALL',
    PAUSED: 'PAUSED'
  };
  options: GridsterConfig;
  agentWidget: GridsterItem = {cols: 2, rows: 1, y: 0, x: 0};
  callWidget: GridsterItem = {cols: 2, rows: 2, y: 0, x: 2};

  agents = {};
  calls: [];

  private socketSubscription: any;

  constructor(private socketService: SocketService) {
    this.connect();
  }

  connect() {
    if (!this.socketSubscription) {
      this.socketSubscription = this.socketService.listen(environment.callCenterDataEmittedEventName).subscribe((data: any) => {
        console.log('data', data);
        // this.agents = data.agents;
        this.handleAgentsData(data.agents);
        this.calls = data.calls;
      });
    }
  }

  handleAgentsData(agents: []) {
    agents.forEach((a: any) => {
      if ((a.name) in this.agents) {

      } else {
        this.agents[a.name] = a;
      }

    });
    console.log('this.agents', this.agents);
  }

  disconnect() {
    this.socketSubscription.unsubscribe();
    this.socketSubscription = undefined;
  }


  ngOnInit() {
    this.options = {
      // itemChangeCallback: DashboardComponent.itemChange,
      // itemResizeCallback: DashboardComponent.itemResize,
      draggable: {
        enabled: true
      },
      pushItems: true,
      resizable: {
        enabled: true
      }
    };
  }

  // static itemChange(item, itemComponent) {
  //   console.log('itemChanged', item, itemComponent);
  // }
  //
  // static itemResize(item, itemComponent) {
  //   console.log('itemResized', item, itemComponent);
  // }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
    this.socketSubscription = undefined;
  }

}
