<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import Table, { TableTitle} from '@/types/table.ts';
  import Plan from '@/types/planning.ts';
  const template = require('./planning.html')

  @Component({
    template
  })
  export default class planing extends Vue {
    planTable = new Table(new Plan())
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./planning.scss";
</style>