<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '../../components/FormBuilder/FormBuilder.vue';
  import Summary from '@/components/Summary/Summary.vue';
  import { IResponse } from '../../services/http_client.service';
  import { attendanceService } from './attendance.service';
  import { getUserInfo } from '../../utils/auth';
  import { classService } from '../studentAndTeacherResource/class/class.service';
  import { Class } from '../studentAndTeacherResource/class/model/class.model';
  import { AttendanceQueryDTO, AttendanceResponseDTO } from './dtos/attendance.query.dto';
  import Popup from '../../components/Popup/Popup.vue';
  import { Attendance } from "./model/attendance.model";


  const template = require('./attendance.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup,
      cpSummary: Summary,
    }
  })
  export default class attendance extends Vue {
    attendanceService = attendanceService;
    attendanceList: Attendance[] = [];
    response:AttendanceResponseDTO;
    summaryData: any[] = [{
      title: '应提交',
      number: 0,
      icon: 'edit'
    }, {
      title: '正常提交',
      number: 0,
      icon: 'edit'
    }, {
      title: '补缴',
      number: 0,
      icon: 'edit'
    }, {
      title: '未提交',
      number: 0,
      icon: 'edit'
    }];
    model = new AttendanceQueryDTO();
    schema = {
      fields: [{
        type: 'select',
        model: 'class_id',
        placeholder: '请选择班级',
        label: '班级',
        options: [],
        onChange(val: any) {
          console.log(val);
        }
      }, {
        type: 'date',
        model: 'signin_date',
        placeholder: '签到日期',
        label: '签到日期'
      }]
    }
    async get_attendance_summary() {
      if (!!this.model) {
        const response = await attendanceService.get_attendance_summary(this.model);
        if (response.code === 200) {
          this.summaryData[0].number = response.data.total
          this.summaryData[1].number = response.data.normal;
          this.summaryData[2].number = response.data.supplement;
          this.summaryData[3].number = response.data.undo;
          this.response = response.data;
        }
      }
    }

    onTabClick(index: number) {
      switch(index) {
        case 1:
          this.attendanceList = this.response.normal_data;
          break;
        case 2:
          this.attendanceList = this.response.supplement_data;
          break;
        case 3:
          this.attendanceList = this.response.undo_data;
          break;
      }
    }
    
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const _userInfo = getUserInfo();
      classService.get_class_list({teacher_id: _userInfo.user.id}).then((resp) => {
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
            vm.get_attendance_summary();
          })
        } else {
          next((vm: any) => {
            vm.$message('服务器异常请稍后再试');
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./attendance.scss";
</style>