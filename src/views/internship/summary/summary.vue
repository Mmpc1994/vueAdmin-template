<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import { getUserInfo } from '../../../utils/auth';
  import { classService } from '../../studentAndTeacherResource/class/class.service';
  import { Class } from '../../studentAndTeacherResource/class/model/class.model';
  import { internshipService } from '../internship.service';
  import { InternshipSummaryQueryDTO } from '../dtos/internshipSummary.query.dto';
  import { InternshipSummaryApproveDTO } from '../dtos/internshipSummaryApprove.dto';
  import { InternshipSummary } from './models/internshipSummary.model';
  import Popup from '@/components/Popup/Popup.vue';
  import { IResponse } from '../../../services/http_client.service';

  const template = require('./summary.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class InternshipSummaryComponent extends Vue {
    model = new InternshipSummaryQueryDTO();
    internshipService = internshipService;
    internshipSummaryList : InternshipSummary[] = [];
    internshipSummary = new InternshipSummary();

    dialogVisible = false;
    schema = {
      fields: [{
        type: 'select',
        model: 'class_id',
        placelholder: '请选择班级',
        label: '班级名称',
        options: []
      }, {
        type: 'select',
        model: 'comment_status',
        placelholder: '是否批阅',
        label: '批阅状态',
        options: [{
          label: '已批阅',
          value: '已批阅'
        }, {
          label: '未批阅',
          value: '未批阅'
        }]
      }]
    }
    async get_internship_summary() {
      const response = await internshipService.get_internship_summary(this.model)
      if (response.code === 200) {
        this.internshipSummaryList = response.data;
      }
      console.log(response);
    }
    before_approve(row: InternshipSummary) {
      this.internshipSummary = row;
      this.dialogVisible = true;
    }
    async approve() {
      const query = new InternshipSummaryApproveDTO();
      query.teacher_id = getUserInfo().user.id;
      query.comment_content = this.internshipSummary.comment_content;
      query.summary_id = this.internshipSummary.id;

      const response = await this.internshipService.approve_internship_summary(query)
      if (response.code === 200) {
        this.$message('批阅成功')
        this.dialogVisible = false;
        this.internshipSummary.comment_status = '已批阅'
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
            vm.get_internship_summary();
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./summary.scss";
</style>