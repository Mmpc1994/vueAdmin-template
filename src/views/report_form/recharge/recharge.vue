<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import ReportSearch from '../components/report_search/report_search.vue';
  import { Route } from 'vue-router';
  import { reportService } from '../report_form.service';
  import { ReportQueryDTO } from '../dtos/report_query.dto';
  import { RechargeReport } from '../model/recharge_report.model';
  import { HTTP } from '../../../services/http_client.service';
  import { RechargeDetailDTO } from '../dtos/recharge_detail';


  import * as moment from 'moment';


  const template = require('./recharge.html')

  @Component({
    template: template,
    components: {
      ReportSearch
    }
  })
  export default class recharge extends Vue {
    query = new ReportQueryDTO();
    dataList: RechargeReport[] = [];
    dialogVisible = false;
    rechargeDetailList: RechargeDetailDTO[] = [];
    total = 0;
    async getRechargeReports(current = 1) {
      this.query.pageNo = current;
      if (this.query.startDate) {
        this.query.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      }
      if (this.query.endDate) {
        this.query.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      }
      const response = await reportService.getRechargeReports(this.query);  
      if (response.code === 200) {
        this.dataList = response.data.data;
        this.total = response.data.totalCount;
      }
    }

    exportReport() {
      location.href = '/api/finance-reports/recharge-records/actions/export?' + HTTP.encodeSearchParams(this.query);
    }

    async onRowClick(row: RechargeReport) {
      const response = await reportService.getRechargeDetail(row.tradeDetailInfoId)
      if (response.code === 200) {
        this.rechargeDetailList = response.data;
        this.dialogVisible = true;
      }
    }
    
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new ReportQueryDTO();
      reportService.getRechargeReports(query).then(resp => {
        next((vm: any) => {
          if (resp.code === 200) {
            vm.dataList = resp.data.data;
            vm.total = resp.data.totalCount;
          }
        })
      })
    }
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./recharge.scss";
</style>