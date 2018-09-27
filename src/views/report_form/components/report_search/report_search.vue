<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';

  const template = require('./report_search.html')

  @Component({
    template: template,
    components: {
      FormBuilder
    }
  })
  export default class report_search extends Vue {
    @Prop()
    query: any;
    querySchema = {
      fields: [{
        type: 'date',
        model: 'startDate',
        placeholder: '开始时间'
      }, {
        type: 'date',
        model: 'endDate',
        placeholder: '结束时间'
      }, {
        type: 'input',
        model: 'serialNo',
        placeholder: '订单号'
      }, {
        type: 'input',
        model: 'phone',
        placeholder: '账户ID'
      }, {
        type: 'input',
        model: 'paymentType',
        placeholder: '支付方式'
      }]
    }

    submit() {
      this.$emit('search');
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./report_search.scss";
</style>