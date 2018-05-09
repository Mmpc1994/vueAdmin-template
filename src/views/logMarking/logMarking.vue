<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import Summary from '@/components/Summary/Summary.vue';
  import FormBuilder from '../../components/FormBuilder/FormBuilder.vue';
  import { getUserInfo } from '../../utils/auth';
  import { classService } from '../studentAndTeacherResource/class/class.service';
  import { Class } from '../studentAndTeacherResource/class/model/class.model';
  import { LogMarkingQueryDTO, LogMarkingSummaryQueryDTO, LogMarkingSummaryResponseDTO } from './dtos/logMarking.query.dto';
  import { LogMarkingCommentDTO } from './dtos/logMarking.comment.dto';
  import { logMarkingService } from './logMarking.service';
  import { LogMarking } from './model/logMarking.model';
  import Popup from '../../components/Popup/Popup.vue';
  const template = require('./logMarking.html')

  @Component({
    template: template,
    components: {
      cpSummary: Summary,
      FormBuilder,
      Popup
    }
  })
  export default class logMarking extends Vue {
    logMarkingService = logMarkingService;
    logMarkingList: LogMarking[] = [];
    logMarking = new LogMarking();
    visible = false;
    dialogVisible = false;
    summaryData: any[] = [{
      title: '应提交',
      number: 0,
      icon: 'edit'
    }, {
      title: '正常提交',
      number: 0,
      icon: 'edit'
    }, {
      title: '补交',
      number: 0,
      icon: 'edit'
    }, {
      title: '未提交',
      number: 0,
      icon: 'edit'
    }];
    summaryResponse = new LogMarkingSummaryResponseDTO();
    model = new LogMarkingQueryDTO();
    
    schema = {
      fields: [{
        type: 'select',
        model: 'class_id',
        placelholder: '请选择班级',
        label: '班级名称',
        options: []
      }, {
        type: 'select',
        model: 'r_type',
        placelholder: '请选择类型',
        label: '日志类型',
        options: [{
          label: '日报',
          value: 'dailyReport'
        }, {
          label: '周报',
          value: 'weeklyReport'
        }, {
          label: '月报',
          value: 'monthlyReport'
        }]
      }, {
        type: 'date',
        model: 'report_time',
        placelholder: '请选择时间',
        label: '时间'
      }]
    }
    rules = {
      comment_content: [{
        required: true,
        message: '请输入批语',
        trigger: 'blur'
      }],
      comment_score: [{
        require: true,
        message: '请给日志打分',
        trigger: 'blur'
      }]
    }
    logMarking_schema = {
      fields: [{
        type: 'input',
        model: 'student_name',
        label: '学生姓名'
      }, {
        type: 'input',
        model: 'class_name',
        label: '班级'
      }, {
        type: 'input',
        inputType: 'textarea',
        model: 'content',
        label: '内容'
      }, {
        type: 'input',
        inputType: 'textarea',
        model: 'harvest',
        label: '心得'
      }, {
        type: 'input',
        inputType: 'textarea',
        model: 'feedback',
        label: '反馈'
      }, {
        type: 'input',
        model: 'report_date',
        label: '报告日期'
      }, {
        type: 'input',
        label: '批阅状态',
        model: 'comment_status'
      }, {
        type: 'input',
        label: '打分',
        model: 'comment_score',
        inputType: 'number'
      }, {
        type: 'input',
        label: '批语',
        model: 'comment_content',
        inputType: 'textarea'
      }]
    };
    async get_logMarking_summary() {
      const response = await logMarkingService.get_logMarking_summary(this.model)
      if (response.code === 200 ) {
        this.summaryData[0].number = response.data.total;
        this.summaryData[1].number = response.data.normal;
        this.summaryData[2].number = response.data.supplement;
        this.summaryData[3].number = response.data.undo;

        Object.assign(this.summaryResponse, response.data);
      }
    }

    async get_logMarking_data() {
      const response = await logMarkingService.get_logMarking_data(this.model);
      if (response.code === 200) {
        this.logMarkingList = response.data;
      }
    }

    options = {
      label: true
    }
    
    onRowClick(row: LogMarking) {
      this.visible = true;
      this.logMarking = row;
    }

    onTabClick(tab: any) {
      this.logMarkingList = [];
      if (tab.index === '0') {
        this.model.target_type = 'done';
      } else {
        this.model.target_type = 'undo';
      }
      this.get_logMarking_data();
    }

    search() {
      this.get_logMarking_summary();
      this.get_logMarking_data();
    }

    before_comment($event: any, row: LogMarking) {
      $event.stopPropagation();
      $event.preventDefault();
      this.logMarking = row;
      this.dialogVisible = true;
    }

    async comment(ref: string) {
      const _userInfo = getUserInfo();
      let promise = new Promise((resolve, reject) => {
        if (ref === 'form-builder') {
          (this.$refs[ref] as any).submit().then((valid:boolean) => {
            resolve(valid)
          })
        } else {
          (this.$refs[ref] as any).validate((valid: boolean) => {
            resolve(valid);
          }) 
        }
      })

      promise.then(async (valid: boolean) => {
        if (valid && this.logMarking.comment_content) {
          const logMarkingCommentDTO = new LogMarkingCommentDTO();
          logMarkingCommentDTO.r_type = this.model.r_type;
          logMarkingCommentDTO.report_id = this.logMarking.id;
          logMarkingCommentDTO.comment_content = this.logMarking.comment_content;
          logMarkingCommentDTO.comment_score = this.logMarking.comment_score;
          logMarkingCommentDTO.teacher_id = _userInfo.user.id;
          const response = await logMarkingService.comment(logMarkingCommentDTO);
          if (response.code === 200) {
            this.$message('日志批阅成功')
            this.dialogVisible = false;
          }
        }
      })
    }

    
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const _userInfo = getUserInfo();
      classService.get_class_list({teacher_id: _userInfo.user.id}).then(resp => {
        if (resp.code === 200) {
          next((vm: any) => {
            const _classList: any[] = resp.data.map((val) => {
              return {
                label: val.name,
                value: val.id
              }
            })
            vm.schema.fields[0].options = _classList;
            vm.model.class_id = _classList[0].value;
            vm.get_logMarking_summary();
            vm.get_logMarking_data();
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./logMarking.scss";
</style>