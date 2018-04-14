<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./logger.html')

  @Component({
    template: template
  })
  export default class logger extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./logger.scss";
</style>