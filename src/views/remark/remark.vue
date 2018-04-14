<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { StudentAndLoggerWaitRemarkLink, 
      StudentAndLoggerAlreadyRemarkLink, 
      StudentAndLoggerWaitSubmitLink } from '@/types/StudentAndLoggerLink.ts';

  import searchBar from '@/components/searchbar/searchbar.vue';

  import Table, { TableTitle } from '@/types/table.ts';
  const template = require('./remark.html')

  @Component({
    template: template,
    components: {
      searchBar
    }
  })
  export default class remark extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./remark.scss";
</style>