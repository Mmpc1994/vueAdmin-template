<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import { getUserInfo } from '../../../utils/auth';
  import { classService } from '../../studentAndTeacherResource/class/class.service';
  import { Class } from '../../studentAndTeacherResource/class/model/class.model';
  import { internshipService } from '../internship.service';
  import { InternshipPlanningQueryDTO } from '../dtos/internshipPlanning.query.dto';
  import { InternshipPlanning } from './models/internshipPlanning.model';
  import Popup  from '@/components/Popup/Popup.vue';

  const template = require('./planning.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class planning extends Vue {
    model = new InternshipPlanningQueryDTO();
    planning = new InternshipPlanning();
    internshipService = internshipService;
    internshipPlanningsList: InternshipPlanning[] = [];

    dialogVisible =false
    visible = false;
    approve_status: string = '通过'
    schema = {
      fields: [{
        type: 'select',
        model: 'class_id',
        placelholder: '请选择班级',
        label: '班级名称',
        options: []
      }, {
        type: 'select',
        model: 'is_changed',
        placeholder: '是否变更申请',
        options: [{
          label: '是',
          value: true
        }, {
          label: '否',
          value: false
        }]
      }, {
        type: 'select',
        model: 'approve_status',
        placeholder: '请选择审核状态',
        options: [{
          label: '未审核',
          value: '未审核'
        }, {
          label: '通过',
          value: '通过'
        }, {
          label: '拒绝',
          value: '拒绝'
        }]
      }]
    }
    async get_internship_planning() {
      const response = await internshipService.get_internship_planning(this.model);
      if (response.code === 200) {
        this.internshipPlanningsList = response.data;
      }
    }
    
    planning_schema = {
      fields: [{
        type: 'input',
        label: '是否审核',
        model: 'approve_status'
      }, {
        type: 'input',
        label: '学生姓名',
        model: 'student_name'
      }, {
        type: 'input',
        label: '班级',
        model: 'class_name'
      }, {
        type: 'input',
        label: '实习企业名称',
        model: 'company_name'
      }, {
        type: 'input',
        label: '创建时间',
        model: 'create_time'
      }, {
        type: 'input',
        label: '工作状态',
        model: 'job_status'
      }, {
        type: 'input',
        label: '工资',
        model: 'salary'
      }, {
        type: 'input',
        model: 'approve_teacher_name',
        label: '审核老师姓名'
      }, {
        type: 'input',
        inputType: 'textarea',
        model: 'description',
        label: '描述'
      }]
    }
    options = {
      label: true
    }
    onRowClick(row: InternshipPlanning) {
      this.visible = true;
      this.planning = row;
    }

    before_approve($event: any, row: InternshipPlanning) {
      $event.stopPropagation();
      $event.preventDefault();
      this.dialogVisible = true;
      this.planning = row;
    }
    async approve() {
      this.planning.approve_status = this.approve_status;
      const response = await internshipService.approve(this.planning, getUserInfo().user.id)
      if (response.code === 200) {
        this.$message('审核成功');
        this.dialogVisible = false;
      }
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
            vm.$set(vm.model, 'school_id', _userInfo.user.school_id)
            vm.get_internship_planning();
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./planning.scss";
</style>