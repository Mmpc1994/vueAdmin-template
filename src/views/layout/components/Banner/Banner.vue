<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./Banner.html');

  console.log(template);

  @Component({
    template: template
  })
  export default class Banner extends Vue {
    
  }
</script>

<style lang="scss">
  /* @import "src/styles/variables","src/styles/mixins"; */
  @import "./Banner.scss";
</style>