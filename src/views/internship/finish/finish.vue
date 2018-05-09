<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import { getUserInfo } from '../../../utils/auth';
  import { classService } from '../../studentAndTeacherResource/class/class.service';
  import { Class } from '../../studentAndTeacherResource/class/model/class.model';
  import { internshipService } from '../internship.service';
  import { InternshipFinishQueryDTO } from '../dtos/internshipFinish.query.dto';
  import { InternshipFinish } from './models/internshipFinish.model';
  import { InternShipApproveDTO } from '../dtos/internshipFinishApprove.dto';
  import Popup  from '@/components/Popup/Popup.vue';
  const template = require('./finish.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class FinishComponent extends Vue {
    internshipService = internshipService;
    internshipFinishList: InternshipFinish[] = [];
    internShipFinish = new InternshipFinish();
    dialogVisible = false;
    approve_status = '通过';
    schema = {
      fields: [{
        type: 'select',
        model: 'class_id',
        placelholder: '请选择班级',
        label: '班级名称',
        options: []
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
    model = new InternshipFinishQueryDTO();
    async get_internship_finish() {
      const respone = await internshipService.get_internship_finish(this.model);
      if (respone.code === 200) {
        this.internshipFinishList = respone.data;
        console.log(respone);
      }
    }

    before_approve(row: InternshipFinish) {
      this.internShipFinish = row;
      this.dialogVisible = true;
    }

    async approve() {
      const query = new InternShipApproveDTO()
      query.teacher_id = getUserInfo().user.id;
      query.approve_status = this.approve_status;
      query.finish_apply_id = this.internShipFinish.id;
      const response = await this.internshipService.approve_internship_finish(query);
      if (response.code === 200) {
        this.$message('审核成功');
        this.dialogVisible = false;
        this.internShipFinish.approve_status = this.approve_status;
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
            vm.get_internship_finish();
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./finish.scss";
</style>