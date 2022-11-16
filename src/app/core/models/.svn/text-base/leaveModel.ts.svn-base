export class LeaveModel {
    LvNo: string;
    EmployeeId: number;
    FromDate: Date;
    ToDate: Date;
    LeaveDays: number;
    Remark: string;
    UserId: number;
    AmpmFull: string;
    LeaveType: String;
    LeaveStatus: String;
    Marker: String;
    attachments: any = []
    constructor() {
        //this.Remark = '- Lý do nghỉ: \n- Công việc bàn giao: \n- Người nhận bàn giao: \n- Thông tin liên lạc: ';
    }
}
export class ReasonLeave {
    reason: string;
    jobtranfer: string;
    emptranfer: string;
    contact: string;
    getRemark() {
        return '- Lý do nghỉ: ' + this.reason +
            '\n- Công việc bàn giao: ' + this.jobtranfer +
            '\n- Người nhận bàn giao: ' + this.emptranfer +
            '\n- Thông tin liên lạc: ' + this.contact;
    }
    loadRemark(remark: String) {
        let arrRemark = remark.split('\n');
        if (arrRemark.length == 4) {
            this.reason = arrRemark[0].split(':')[1];
            this.jobtranfer = arrRemark[1].split(':')[1];
            this.emptranfer = arrRemark[2].split(':')[1];
            this.contact = arrRemark[3].split(':')[1];
        }
    }
}