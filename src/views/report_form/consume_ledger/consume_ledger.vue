<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import { Route } from 'vue-router';
  import { ConsumeQueryDTO } from '../dtos/consume.dto';
  import { reportService } from '../report_form.service';
  import { ConsumeReport } from '../model/consume_report.model';
  import { TradeDetailQueryDTO, TradeDetailResponseDTO } from '../dtos/trade_detail.dto';
  import { HTTP } from '../../../services/http_client.service';

  import * as moment from 'moment';

  const template = require('./consume_ledger.html')

  @Component({
    template,
    components: {
      FormBuilder
    }
  })
  export default class consume_ledger extends Vue {
    @Watch('query.orderType')
    onTypeChange(val: any) {
      this.search();
    }
    
    query = new ConsumeQueryDTO();
    dialogVisible = false;
    total = 0;
    dataList: ConsumeReport[] = [];
    tradeList: TradeDetailResponseDTO[] = [];
    querySchema = {
      fields: [{
        type: 'input',
        model: 'companyName',
        placeholder: '代理商名称'
      }, {
        type: 'input',
        model: 'userName',
        placeholder: '用户名'
      }, {
        type: 'input',
        model: 'productName',
        placeholder: '航班号'
      }, {
        type: 'input',
        model: 'serialNo',
        placeholder: '订单号'
      }, {
        type: 'input',
        model: 'phone',
        placeholder: '手机号'
      }, {
        type: 'input',
        model: 'ticketNo',
        placeholder: '票号'
      }, {
        type: 'input',
        model: 'passengerName',
        placeholder: '乘客姓名'
      }, {
        type: 'input',
        model: 'carrierch',
        placeholder: '航司'
      }, {
        type: 'input',
        model: 'flightNo',
        placeholder: '航班号'
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
    async onRowClick(row: ConsumeReport) {
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
      location.replace('/b2b/api/finance-reports/consumption-records/actions/export?' + HTTP.encodeSearchParams(this.query));
    }
    async search(current = 1) {
      this.query.pageNo = current;
      this.query.cunsumptionType = 1;
      if (this.query.startDate) {
        this.query.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      }
      if (this.query.endDate) {
        this.query.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      }
      const response = await reportService.getConsumeReports(this.query);
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
  @import "./consume_ledger.scss";
</style>