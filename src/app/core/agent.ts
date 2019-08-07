/* tslint:disable:variable-name */
export class Agent {

  private callStatuses = {
    IDLE: 'IDLE',
    IN_CALL: 'IN CALL',
    PAUSED: 'PAUSED'
  };
  private readonly EFFECTIVE_CALL_TIME = 3;

  constructor({name, number, status, inStatusTime, loggedInTime, totalCalls, effectiveCalls}) {
    this.name = name;
    this.phone = number;
    this.status = status;
    this.inStatusTime = inStatusTime;
    this.loggedInTime = loggedInTime;
    this.totalCalls = 0;
    this.effectiveCalls = 0;
    this.startStatusTime = Date.now();
    this.startLoggedInTime = Date.now();
  }

  name: string;
  phone: string;
  status: string;
  inStatusTime: number;
  loggedInTime: any;
  totalCalls: number;
  effectiveCalls: number;
  startStatusTime: any;
  startLoggedInTime: any;

  checkStatus(newStatus: string) {
    if (this.status !== newStatus) {
      if (this.status === this.callStatuses.IN_CALL && this.inStatusTime > this.EFFECTIVE_CALL_TIME) {
        this.effectiveCalls++;
      }
      this.startStatusTime = Date.now();
    }
  }

  calcTotalCalls(newStatus: string) {
    if (this.status !== newStatus) {
      if (this.status === this.callStatuses.IN_CALL) {
        this.totalCalls++;
      }
      this.status = newStatus;
    }
  }

  calcLoggedInAndStatusTime() {
    this.inStatusTime = Math.floor((Date.now() - this.startStatusTime) / 1000);
    this.loggedInTime = Math.floor((Date.now() - this.startLoggedInTime) / 1000);
  }
}
