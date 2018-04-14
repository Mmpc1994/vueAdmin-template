<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./progress.html')

  @Component({
    template: template
  })
  export default class progress extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./progress.scss";
</style>