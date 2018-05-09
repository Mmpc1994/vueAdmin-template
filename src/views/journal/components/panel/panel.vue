<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Journal } from '../../model/journal.model';
  import { State } from 'vuex-class';
  import { DateFormat } from '../../../../utils/index';
  const template = require('./panel.html')

  @Component({
    template: template
  })
  export default class panel extends Vue {
    @Prop()
    journal: Journal;

    get date() {
      if (!this.journal.id) return;
      switch (this.type) {
        case '日报':
          return DateFormat(new Date((this.journal as any).report_date), 'yyyy-MM-dd');
        case '周报':
          return (this.journal as any).report_week ? (this.journal as any).report_week.replace(':', '第') + '周' : '';
        case '月报':
          return (this.journal as any).report_month ? (this.journal as any).report_month.replace(':', '-') : '';
      }
    }

    @State(state => state.app.journalType) type: string;
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./panel.scss";
</style>