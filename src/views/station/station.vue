<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./station.html')

  @Component({
    template: template
  })
  export default class station extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./station.scss";
</style>