<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import { Route } from 'vue-router';
  import PopupComponent from '@/components/Popup/Popup.vue';
  import { orderType, airTicketService } from './air_ticket.service';
  import { AirTicketQueryRequestDTO, AirTicketOrderResponseDTO } from './dtos/air_ticket_order.dto';
  import { AIR_TICKET_STATUS } from '../../constants/air_ticket_status.constant';
  import AirChangeTable from '@/components/AirChangeTable/AirChangeTable.vue';
  import { AirTicketChangeDTO, ITicketInfo } from './dtos/air_ticket_change.dto';
  import { Voyage } from './models/voyage.model';
  import { DateFormat } from '../../utils';


  const template = require('./air_ticket.html')

  @Component({
    template,
    components: {
      FormBuilder,
      PopupComponent,
      AirChangeTable
    }
  })
  export default class air_ticket extends Vue {
    total = 0;
    visible = false;
    ticketInfo = new ITicketInfo();
    model = new AirTicketOrderResponseDTO();
    AIR_TICKET_STATUS = AIR_TICKET_STATUS;
    query = new AirTicketQueryRequestDTO();
    dataList: AirTicketOrderResponseDTO[] = [];
    orderType = orderType;
    changeQuery = new AirTicketChangeDTO();
    query_schema = {
      fields: [{
        type: 'input',
        placeholder: '请输入代理商名称',
        model: 'companyName'
      }, {
        type: 'input',
        placeholder: '联系人手机',
        model: 'contactMobile'
      }, {
        type: 'input',
        placeholder: '订单号',
        model: 'serialNumber'
      }]
    }
    onStatusChange(val: any) {
      this.query.orderStatus = val;
      this.search(1);

    }

    approve(row: AirTicketOrderResponseDTO) {
      this.$confirm('您是否通过该改签?', '提示', {
        confirmButtonText: '生成支付链接',
        cancelButtonText: '不通过',
        type: 'warning'
      }).then(() => {
        this.visible = true;
        airTicketService.getAirOrderDetail(row.id).then(resp => {
          if (resp.code === 200) {
            Object.assign(this.model, resp.data);
            this.initChangeData();
          }
        })

      }).catch((action: string) => {
        console.log(action);
      })
    }
    
    confirm(row: AirTicketOrderResponseDTO) {
      this.$confirm('您是否通过该改签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async resp => {
        const query = new AirTicketChangeDTO();
        query.orderStatus = 26;
        const response = await airTicketService.createChangeOrder(query, row.id);
        if (response.code === 200) {
          this.$message('改签成功');
        }
      })
    }

    dateFormat(date: Date) {
      return DateFormat(new Date(date), 'yyyy-MM-dd hh:mm:ss')
    }

    initChangeData() {
      this.ticketInfo.ticketPrice = this.model.ticketPrice;
      this.model.voyages.forEach((val, index) => {
        const ticketInfo = new ITicketInfo();
        ticketInfo.cardNo = this.model.tickets[index].cardNo;
        this.changeQuery.ticketInfoList.push(ticketInfo);
        const voyage = new Voyage();
        Object.assign(voyage, val);
        this.changeQuery.voyages.push(voyage);
      })
    }

    async submit() {
      this.changeQuery.ticketInfoList.forEach(val => {
        val.ticketPrice = Number(this.ticketInfo.ticketPrice);
      })
      this.changeQuery.changePayMoney = Number(this.changeQuery.changePayMoney);
      this.changeQuery.serviceCharge = Number(this.changeQuery.serviceCharge);
      const response = await airTicketService.createChangeOrder(this.changeQuery, this.model.id);
      if (response.code === 200) {
        this.visible = false;
        this.$message('操作成功');
        this.search();
      }
    }
    
    async search(current = 1) {
      this.query.pageNo = current;
      const response = await airTicketService.getOrdersList(this.query);
      if (response.code === 200) {
        this.total = response.data.totalCount;
        this.dataList = response.data.data;
      }
    }
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      next((vm: any) => {
        vm.search();
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./air_ticket.scss";
</style>