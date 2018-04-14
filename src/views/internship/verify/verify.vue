<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import Table, { TableTitle} from '@/types/table.ts';
  import Plan from '@/types/planning.ts';
  const template = require('./verify.html')

  @Component({
    template: template
  })
  export default class verify extends Vue {
    planTable = new Table(new Plan())
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./verify.scss";
</style>