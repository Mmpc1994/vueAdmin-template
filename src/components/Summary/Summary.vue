<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const vueCountTo = require('vue-count-to').default;
  const template = require('./Summary.html')

  @Component({
    template: template,
    components: {
      vueCountTo
    }
  })
  export default class SummaryComponent extends Vue {
    @Prop({
      default: () => [{title: 'Message', number: 3000, icon: 'edit'}]
    })
    summaryList: any[];

    activeTab: string = 'tab1';

    onClick(index: number) {
      this.$emit('tabClick', index);
      this.activeTab = 'tab' + (index + 1);
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./Summary.scss";
</style>