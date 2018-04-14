<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '../../../components/FormBuilder/FormBuilder.vue';
  import { teacherService } from './teacher.service';
  import { Teacher } from './model/teacher.model';
  import { IResponse } from '../../../services/http_client.service';
  import { TeacherQueryDto } from './dto/teacher_query.dto';
  import Popup from '../../../components/Popup/Popup.vue';

  const template = require('./teacher.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class teacherComponent extends Vue {
    teacherService = teacherService
    visible = false
    teacherList: Teacher[] = []
    query = new TeacherQueryDto()
    model = new Teacher()
    
    options = {
      label: true
    }
    query_schema = {
      fields: [{
        type: 'input',
        model: 'major_name',
        placeholder: '专业名称'
      }, {
        type: 'input',
        model: 'class_name',
        placeholder: '班级名称'
      }, {
        type: 'input',
        model: 'edu_exp',
        placeholder: '学历'
      }, {
        type: 'input',
        model: 'qualification',
        placeholder: '职业资格'
      }]
    }
    schema = {
      fields: [{
        type: 'input',
        model: 'name',
        placeholder: '请输入教师姓名',
        label: '教师姓名'
      }, {
        type: 'input',
        model: 'type',
        placeholder: '请输入教师类型',
        label: '教师类型'
      }, {
        type: 'input',
        model: 'phone',
        inputType: 'number',
        placeholder: '请输入联系电话',
        label: '联系电话'
      }, {
        type: 'select',
        model: 'sex',
        placeholder: '请选择性别',
        label: '性别',
        options: [{
          label: '男',
          value: '男'
        }, {
          label: '女',
          value: '女'
        }]
      }, {
        type: 'date',
        model: 'birth_date',
        placeholder: '请选择出身日期',
        label: '出身日期'
      }, {
        type: 'input',
        model: 'id_num',
        placeholder: '请输入身份证号',
        label: '身份证号'
      }, {
        type: 'input',
        model: 'edu_exp',
        placeholder: '请输入学历',
        label: '学历'
      }, {
        type: 'input',
        model: 'degree',
        placeholder: '请输入学位',
        label: '学位'
      }, {
        type: 'input',
        model: 'post',
        placeholder: '请输入岗位',
        label: '岗位'
      }, {
        type: 'input',
        model: 'title',
        placeholder: '请输入职称',
        label: '职称'
      }, {
        type: 'input',
        model: 'qualification',
        placeholder: '请输入职业资格',
        label: '职业资格'
      }, {
        type: 'input',
        model: 'level',
        placeholder: '请输入等级',
        label: '等级'
      }, {
        type: 'input',
        model: 'description',
        placeholder: '请输入描述',
        label: '描述'
      }]
    }
    rules = {
      name: [{
        required: true,
        message: '请输入教师姓名',
        trigger: 'blur'
      }],
      type: [{
        required: true,
        message: '请输入教师类型',
        trigger: 'blur'
      }],
      phone: [{
        min: 11,
        max: 11,
        required: true,
        message: '请输入联系电话',
        trigger: 'blur'
      }],
      sex: [{
        required: true,
        message: '请选择性别',
        trigger: 'change'
      }],
      birth_date: [{
        required: true,
        message: '请选择出身日期',
        trigger: 'change'
      }],
      id_num: [{
        required: true,
        message: '请输入身份证号',
        trigger: 'blur'
      }],
      edu_exp: [{
        required: true,
        message: '请输入学历',
        trigger: 'blur'
      }],
      degree: [{
        required: true,
        message: '请输入学位',
        trigger: 'blur'
      }],
      post: [{
        required: true,
        message: '请输入岗位',
        trigger: 'blur'
      }],
      title: [{
        required: true,
        message: '请输入职称',
        trigger: 'blur'
      }],
      qualification: [{
        required: true,
        message: '请输入职业资格',
        trigger: 'blur'
      }],
      level: [{
        required: true,
        message: '请输入等级',
        trigger: 'blur'
      }],
      description: [{
        required: true,
        message: '请输入描述',
        trigger: 'blur'
      }]
    }

    async get_teacher_info(row: Teacher) {
      if (row.id) {
        const response = await this.teacherService.get_teacher_info(row.id)
        if (response.code === 200) {
          Object.assign(this.model, response.data)
          this.visible = true;
        }
      }
    }

    async submit() {
      delete this.model.create_time
      this.model.birth_year = new Date(this.model.birth_date).getFullYear();
      try {
        const response = await this.teacherService.add_teacher(this.model)
        if (response.code === 200) {
          this.$message('新增教师成功')
          teacherService.get_teacher_list(this.query).then((resp: IResponse<Teacher[]>) => {
            if (resp.code === 200) {
              this.teacherList = resp.data;
            }
          })
        }
      } catch (e) {
        console.log(e);
      }
    }
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new TeacherQueryDto()
      teacherService.get_teacher_list(query).then((resp: IResponse<Teacher[]>) => {
        next((vm: any) => {
          vm.teacherList = resp.data;
          vm.query = query;
        })
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./teacher.scss";
</style>