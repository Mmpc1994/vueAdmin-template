<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  const template = require('./searchbar.html')

  @Component({
    template: template
  })
  export default class SearchBar extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./searchbar.scss";
</style>