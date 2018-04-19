<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./test.html')

  @Component({
    template: template
  })
  export default class testComponent extends Vue {
    test: string = '123123'
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./test.scss";
</style>