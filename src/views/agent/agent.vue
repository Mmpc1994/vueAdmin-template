<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./agent.html')

  @Component({
    template
  })
  export default class agent extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./agent.scss";
</style>