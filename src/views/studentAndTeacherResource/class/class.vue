<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import FormBuilder from '../../../components/FormBuilder/FormBuilder.vue';
  import { Route } from 'vue-router';
  import { classService } from './class.service'
  import { Class } from './model/class.model'
  import { ClassQueryDto } from './dto/class_query.dto';
  import { IResponse } from '../../../services/http_client.service';
  import Popup from '../../../components/Popup/Popup.vue';

  const template = require('./class.html')

  @Component({
    template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class classComponent extends Vue {
    classService = classService
    classList: Class[] = []
    visible = false
    query = {
      major_id: undefined
    }
    model = new Class();
    options = {
      label: true
    }
    query_schema = {
      fields: [{
        type: 'input',
        model: 'name',
        placeholder: '班级名称'
      }]
    }

    rules = {
      name: [{
        required: true,
        message: '请输入班级名称',
        trigger: 'blur'
      }],
      major_id: [{
        trigger: 'change',
        required: true,
        message: '请选择专业'
      }],
      class_admin_name: [{
        required: true,
        message: '请输入班主任姓名',
        trigger: 'blur'
      }],
      class_admin_phone: [{
        min: 11,
        max: 11,
        required: true,
        message: '请输入班主任手机',
        trigger: 'blur'
      }],
      description: [{
        required: true,
        message: '请输入班级描述',
        trigger: 'blur'
      }],
    }

    schema = {
      fields: [{
        type: 'input',
        model: 'name',
        placeholder: '请输入班级名称',
        label: '班级名称'
      }, {
        type: 'select',
        model: 'major_id',
        placeholder: '请选择专业',
        label: '专业',
        options: [{
          label: '专业1',
          value: 6
        }]
      }, {
        type: 'input',
        model: 'class_admin_name',
        placeholder: '请输入班主任姓名',
        label: '班主任姓名'
      }, {
        type: 'input',
        inputType: 'number',
        model: 'class_admin_phone',
        placeholder: '请输入班主任手机',
        label: '班主任手机'
      }, {
        type: 'input',
        model: 'description',
        placeholder: '请输入班级描述',
        label: '班级描述'
      }]
    }
    get_class_list() {
      this.classService.get_class_list(this.query).then((resp: IResponse<Class[]>) => {
        if (resp.code === 200) {
          this.classList = resp.data;
        }
      })
    }

    async submit() {
      this.model.major_name = '专业1';
      delete this.model.student_num;
      try {
        const response = await this.classService.create_class(this.model)
        if (response.code ===  200) {
          this.$message('新增班级成功');
        }
      } catch (e) {
        console.log(e);
      }
    }
    
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new ClassQueryDto()
      classService.get_class_list(query).then((resp: IResponse<Class[]>) => {
        next((vm: any) => {
          vm.classList = resp.data;
          vm.query = query;
        })
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./class.scss";
</style>