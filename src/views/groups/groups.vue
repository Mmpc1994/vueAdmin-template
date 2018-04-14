<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import Table, { TableTitle} from '@/types/table.ts';
  import searchBar from '@/components/searchbar/searchbar.vue';
  import Groups from '@/types/Groups.ts';
  const template = require('./groups.html')

  @Component({
    template: template,
    components: {
      searchBar
    }
  })
  export default class groups extends Vue {
    groupsTable = new Table(new Groups());
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./groups.scss";
</style>