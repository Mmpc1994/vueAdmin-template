<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import ReportSearch from '../components/report_search/report_search.vue';
  import { reportService } from '../report_form.service';
  import { CreditCardReport } from '../model/credit_card_report.model';
  import { ReportQueryDTO } from '../dtos/report_query.dto';
  import { HTTP } from '../../../services/http_client.service';
  import * as moment from 'moment';

  const template = require('./credit.html')

  @Component({
    template,
    components: {
      ReportSearch
    }
  })
  export default class credit extends Vue {
    query = new ReportQueryDTO();
    dataList: CreditCardReport[] = [];
    total = 0;

    async getCreditReports(current = 1) {
      this.query.pageNo = current;
      if (this.query.startDate) {
        this.query.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      }
      if (this.query.endDate) {
        this.query.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      }
      const response = await reportService.getCreditCardReports(this.query);
      if (response.code === 200) {
        this.dataList = response.data.data;
        this.total = response.data.totalCount;
      }
    }

    exportReport() {
      location.href = '/api/finance-reports/repayment-records/actions/export?' + HTTP.encodeSearchParams(this.query);
    }

    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new ReportQueryDTO();
      reportService.getCreditCardReports(query).then(resp => {
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
  @import "./credit.scss";
</style>