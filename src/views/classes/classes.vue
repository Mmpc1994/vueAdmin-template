<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import Table, { TableTitle} from '@/types/table.ts';
  import searchBar from '@/components/searchbar/searchbar.vue';
  import Classes from '@/types/Classes.ts';
  const template = require('./classes.html')

  @Component({
    template,
    components: {
      searchBar
    }
  })
  export default class classes extends Vue {
    classesTable = new Table(new Classes());
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./classes.scss";
</style>