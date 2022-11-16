

export class AnnouncementDto {

  annId: number;
  annType: string;
  contents: string;
  createDate: Date;
  createUser: number;
  expireDate: Date;
  isUse: number;
  subject: string;
  updateDate: Date;
  updateUser: number;
  requestforDriverAgreement: any;

  constructor() {
    this.annId = null;
    this.annType = null;
    this.contents = null;
    this.createDate = null;
    this.createUser = null;
    this.expireDate = null;
    this.isUse = null;
    this.subject = null;
    this.updateDate = null;
    this.updateUser = null;
    this.requestforDriverAgreement = null;
  }
}