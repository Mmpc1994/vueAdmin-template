<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import searchBar from '@/components/searchbar/searchbar.vue';

  const template = require('./finish.html')

  @Component({
    template,
    components: {
      searchBar
    }
  })
  export default class finish extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./finish.scss";
</style>