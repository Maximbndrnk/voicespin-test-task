export class Call {

  private readonly callStatuses = {
    WAITING: 'WAITING',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
  };

  constructor(type, status, callerNumber, callingNumber) {
    this.type = type;
    this.status = status;
    this.callerNumber = callerNumber;
    this.callingNumber = callingNumber;
    this.startStatusTime = Date.now();
  }

  type: string;
  status: string;
  callerNumber: string;
  callingNumber: string;
  timeInStatus: number;
  startStatusTime: number;

}
