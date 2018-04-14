<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import searchBar from '@/components/searchbar/searchbar.vue';
  import Table, { TableTitle} from '@/types/table.ts';
  import User from './punch.ts';
  const template = require('./punch.html')

  @Component({
    template: template,
    components: {
      searchBar
    }
  })
  export default class punch extends Vue {
    userTable = new Table(new User());
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./punch.scss";
</style>