<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  import panel from '../components/panel/panel.vue';
  import { journalService } from '../journal.service';
  import { State } from 'vuex-class';
  import { Journal } from '../model/journal.model';
  const template = require('./readJournal.html')

  @Component({
    template: template,
    components: {
      panel
    }
  })
  export default class readJournal extends Vue {
    @State(state => state.app.journalType) type: '';

    journalList: Journal[] = [];
    
    @Watch('type', {immediate: true})
    async onTypeChange(val: string, oldVal: string) {
      let response;
      switch(val) {
        case '日报':
          response = await journalService.getDailyJournal();
          break;
        case '周报':
          response = await journalService.getWeeklyJournal();
          break;
        case '月报':
          response = await journalService.getMoothlyJournal();
          break;
      }
      if (response && response.code === 200) {
        console.log( response.data);
        this.journalList = response.data;
      }
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./readJournal.scss";
</style>