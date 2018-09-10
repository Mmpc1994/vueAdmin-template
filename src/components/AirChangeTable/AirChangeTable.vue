<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { AirTicketOrderResponseDTO } from '../../views/air_ticket/dtos/air_ticket_order.dto';
  const template = require('./AirChangeTable.html')

  @Component({
    template
  })
  export default class AirChangeTable extends Vue {
    @Prop({
      default() {
        return new AirTicketOrderResponseDTO()
      }
    })
    orderDetail: AirTicketOrderResponseDTO
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./AirChangeTable.scss";
</style>