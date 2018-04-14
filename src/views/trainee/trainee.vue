<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import searchBar from '@/components/searchbar/searchbar.vue';
  const template = require('./trainee.html')

  @Component({
    template: template,
    components: {
      searchBar
    }
  })
  export default class trainee extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./trainee.scss";
</style>