<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import ReportSearch from '../components/report_search/report_search.vue';
  import FormBuilder from '../../../components/FormBuilder/FormBuilder.vue';
  import { RefundReport } from '../model/refund_report.model';
  import { Route } from 'vue-router';
  import { ConsumeQueryDTO } from '../dtos/consume.dto';
  import { HTTP } from '../../../services/http_client.service';
  import { reportService } from '../report_form.service';
  import { TradeDetailQueryDTO, TradeDetailResponseDTO } from '../dtos/trade_detail.dto';
  import * as moment from 'moment';


  const template = require('./refund.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      ReportSearch
    }
  })
  export default class refund extends Vue {
    dataList: RefundReport[] = [];
    tradeList: TradeDetailResponseDTO[] = [];
    query = new ConsumeQueryDTO();
    total = 0;

    querySchema = {
      fields: [{
        type: 'select',
        model: 'orderType',
        options: [{
          label: '飞机票订单',
          value: 'air'
        }],
        placeholder: '请选择订单类型'
      }, {
        type: 'input',
        model: 'productName',
        placeholder: '航班号'
      }, {
        type: 'input',
        model: 'serialNo',
        placeholder: '订单号'
      }, {
        type: 'date',
        model: 'startDate',
        placeholder: '开始日期'
      }, {
        type: 'date',
        model: 'endDate',
        placeholder: '结束日期'
      }]
    }
    dialogVisible = false;
     async onRowClick(row: RefundReport) {
      const query = new TradeDetailQueryDTO();
      query.serialNo = row.serialNo;
      query.isPayment = true;
      const response = await reportService.getTradeDetail(query);
      if (response.code === 200) {
        this.dialogVisible = true;
        this.tradeList = response.data;
      }
    }

    exportReport() {
      location.replace('/api/finance-reports/refund-records/actions/export?' + HTTP.encodeSearchParams(this.query));
    }
    async search(current = 1) {
      this.query.pageNo = current;
      if (this.query.startDate) {
        this.query.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      }
      if (this.query.endDate) {
        this.query.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      }
      const response = await reportService.getRefundoReports(this.query);
      if (response.code === 200) {
        this.total = response.data.totalCount;
        this.dataList = response.data.data;
      }
    }

    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      next((vm: any) => {
        vm.search()
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./refund.scss";
</style>