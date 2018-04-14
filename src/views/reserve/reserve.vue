<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./reserve.html')

  @Component({
    template
  })
  export default class reserve extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./reserve.scss";
</style>