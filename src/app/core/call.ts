export class Call {

  private readonly callStatuses = {
    WAITING: 'WAITING',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
  };

  constructor({type, status, callerNumber, callingNumber, id}) {
    this.id = id;
    this.type = type;
    this.status = status;
    this.callerNumber = callerNumber;
    this.callingNumber = callingNumber;
    this.startStatusTime = Date.now();
  }

  id: string;
  type: string;
  status: string;
  callerNumber: string;
  callingNumber: string;
  startStatusTime: number;

}
