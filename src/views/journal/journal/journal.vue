<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { journalService } from '../journal.service';
  const template = require('./journal.html')

  @Component({
    template: template
  })
  export default class journal extends Vue {
    options = [{
      label: '日报'
    }, {
      label: '周报'
    }, {
      label: '月报'
    }];
    setJournalType(type: string) {
      console.log(1);
      this.$store.commit('SET_JOURNAL_TYPE', type);
    }
    onTabClick(tab: Vue) {
      switch((tab as any).index) {
        case '1':
          this.$router.push('write')
          break;
        case '0':
          this.$router.push('read')
          break;
      }
    }
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./journal.scss";
</style>