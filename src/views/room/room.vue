<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./room.html')

  @Component({
    template: template
  })
  export default class room extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./room.scss";
</style>