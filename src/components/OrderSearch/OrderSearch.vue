<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import FormBuilder from '../FormBuilder/FormBuilder.vue';
  import { AirTicketQueryRequestDTO } from '../../views/orders/dtos/air_ticket_query.dto';
  import { orderType } from '../../views/orders/order.service';
  import { ORDER_SEARCH } from '../../constants/orderSearch.constant';

  const template = require('./OrderSearch.html')

  @Component({
    template: template,
    components: {
      FormBuilder
    }
  })
  export default class OrderSearch extends Vue {
    @Prop({
      default() {
        return new AirTicketQueryRequestDTO();
      }
    })
    query:AirTicketQueryRequestDTO

    submit() {
      this.query.depStartTime = this.query.depTimeRange[0];
      this.query.depEndTime = this.query.depTimeRange[1];
      this.query.orderBeginTime = this.query.orderTimeRange[0];
      this.query.orderEndTime = this.query.orderTimeRange[1];
      if (this.query.keyword) {
        let hit = this.query.hit;
        (this.query as any)[ORDER_SEARCH[hit]] = this.query.keyword;
      }
      this.$emit('search');
    }
    
    options = {
      label: true,
      labelWidth: '80px'
    }
    querySchema = {
      fields: [{
        type: 'select',
        model: 'orderStatus',
        options: orderType,
        label: '订单类型:'
      }, {
        type: 'date',
        model: 'orderTimeRange',
        dateType: 'daterange',
        label: '订单时间:'
      }, {
        type: 'date',
        model: 'depTimeRange',
        dateType: 'daterange',
        label: '起飞时间:'
      }, {
        type: 'radios',
        label: '查询条件',
        model: 'hit',
        options: [{
          label: 'PNR小编码',
          value: 0
        }, {
          label: '乘客姓名',
          value: 1
        }, {
          label: '订单编号',
          value: 2
        }, {
          label: '票号',
          value: 3
        }, {
          label: '航班号',
          value: 4
        }, {
          label: '证件号',
          value: 5
        }, {
          label: 'PNR大编码',
          value: 6
        }]
      }, {
        type: 'input',
        model: 'keyword'
      }]
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./OrderSearch.scss";
</style>