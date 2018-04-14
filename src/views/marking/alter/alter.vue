<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import searchBar from '@/components/searchbar/searchbar.vue';

  const template = require('./alter.html')

  @Component({
    template,
    components: {
      searchBar
    }
  })
  export default class alter extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./alter.scss";
</style>