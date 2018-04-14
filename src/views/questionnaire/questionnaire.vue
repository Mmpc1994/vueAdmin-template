<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./questionnaire.html')

  @Component({
    template: template
  })
  export default class questionnaire extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./questionnaire.scss";
</style>