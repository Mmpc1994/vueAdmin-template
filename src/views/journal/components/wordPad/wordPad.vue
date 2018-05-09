<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { DailyJournal, WeeklyJournal, MonthlyJournal, Journal } from '../../model/journal.model';
  import { getWeekNumber, DateFormat } from '../../../../utils/index.js';
  import { journalService } from '../../journal.service';
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  const template = require('./wordPad.html')

  @Component({
    template: template,
    components: {
      FormBuilder
    }
  })
  export default class wordPad extends Vue {
    type = '周';
    test = new Date();

    options = {
      label: true
    }

    async submit() {
      const report_date = this.model.report_date;
      let response,
          now = new Date();

      switch(this.type) {
        case '日':
          // 如果选择的日期是将来的日期就提示
          if (report_date.getDate() > new Date().getDate()) {
            this.$message({
              type: 'info',
              message: '您不能提交将来的日报'
            });
            break;
          } else if (report_date.getDate() === new Date().getDate()) {
            // 正常提交
            const daily = Object.assign(new DailyJournal(), this.model);
            response = await journalService.submitDailyJournal(daily);
            break;
          } else {
            // 补缴
            break;
          }
        case '周':
          if (getWeekNumber(report_date) > getWeekNumber()) {
            this.$message({
              type: 'info',
              message: '您不能提交将来的周报'
            });
            break;
          } else if (getWeekNumber(report_date) === getWeekNumber()) {
            // 正常提交
            const weekly = Object.assign(new WeeklyJournal(), this.model),
                  week = getWeekNumber(),
                  year = now.getFullYear(),
                  month = now.getMonth(),
                  date = now.getDate(),
                  day = now.getDay()
            delete weekly.report_date;
            weekly.report_week = year + ':' + week;
            weekly.begin_date = DateFormat(new Date(year, month, date - day), 'yyyy-MM-dd');
            weekly.end_date = DateFormat(new Date(year, month, date + 6 - day + 1), 'yyyy-MM-dd');
            response = await journalService.submitWeeklyJournal(weekly);
            break;
          } else {
            // 补缴
            break
          }
        case '月':
          if (report_date.getMonth() > new Date().getMonth()) {
            this.$message({
              type: 'info',
              message: '您不能提交将来的月报'
            });
            break;
          } else if (report_date.getMonth() === new Date().getMonth()) {
            // 正常提交
            const monthly = Object.assign(new MonthlyJournal(), this.model),
                  year = now.getFullYear(),
                  month = now.getMonth()
            monthly.report_month = year + ':' + (Number(month) + 1);
            monthly.begin_date = DateFormat(new Date(year, month, 1), 'yyyy-MM-dd');
            const end_date = new Date(year, month, 0).getDate();
            monthly.end_date = DateFormat(new Date(year, month, end_date), 'yyyy-MM-dd');

            delete monthly.report_date;
            console.log(DateFormat(new Date(year, month, 1)));
            response = await journalService.submitMoothlyJournal(monthly);
            break;
          } else {
            // 补缴
            break
          }
      }
      if (response && response.code === 200) {
        this.$message('工作报告提交成功');
        this.model = {
          report_date: new Date()
        }
      }
    }

    model = {
      report_date: new Date(),
    }

    get schema() {
      const _schema: any = {
        fields: [{
          type: 'input',
          inputType: 'textarea',
          label: `本${this.type}工作内容`,
          model: 'content'
        }, {
          type: 'input',
          inputType: 'textarea',
          label: `本${this.type}收获`,
          model: 'harvest'
        }, {
          type: 'input',
          inputType: 'textarea',
          label: `本${this.type}反馈`,
          model: 'feedback'
        }]
      }
      switch(this.type) {
        case '日':
          _schema.fields.unshift({
            type: 'date',
            model: 'report_date',
            label: '报告日期'
          })
          break;
        case '周':
          _schema.fields.unshift({
            type: 'date',
            dateType: 'week',
            format: 'yyyy 第 WW 周',
            label: '选择周',
            model: 'report_date'
          });
          break;
        case '月':
          _schema.fields.push({
            type: 'input',
            inputType: 'textarea',
            label: '下月计划',
            model: 'next_plan'
          });
          _schema.fields.unshift({
            type: 'date',
            dateType: 'month',
            label: '选择月',
            model: 'report_date'
          });
          break;
      }

      return _schema
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./wordPad.scss";
</style>