import { Injectable } from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';
import { ApplicationHttpClient } from '../_base/http-client';


@Injectable()
export class DashboardService {

    private urlAPI: string;
    constructor(private http: ApplicationHttpClient) {
        this.urlAPI = http._urlAPIEnterprise + "/booking/";
    }
    
    getDataSource() {
        return new DataSource({
            store: {
                type: "odata",
                url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
                beforeSend: function(request) {
                    request.params.startDate = "2018-05-10";
                    request.params.endDate = "2018-05-15";
                }
            }
        });
    }

}

