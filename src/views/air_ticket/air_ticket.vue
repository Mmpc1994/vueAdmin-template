<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./air_ticket.html')

  @Component({
    template
  })
  export default class air_ticket extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./air_ticket.scss";
</style>