<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '../../../components/FormBuilder/FormBuilder.vue';
  import { majorService }  from './major.service';
  import { Major } from './model/major.model';
  import { IResponse } from '../../../services/http_client.service';
  import { MajorQueryDto } from './dto/major_query.dto';
  import Popup from '../../../components/Popup/Popup.vue';

  const template = require('./major.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class major extends Vue {
    majorService = majorService
    majorList: Major[] = []
    visible = false
    query = {
      name: ''
    }
    model = new Major()
    options = {
      label: true
    }
    query_schema = {
      fields: [{
        type: 'input',
        model: 'major_name',
        placeholder: '专业名称'
      }]
    }
    rules = {
      name: [{
        required: true,
        message: '请输入班级名称',
        trigger: 'blur'
      }],
      major_admin_name: [{
        required: true,
        message: '请输入专业管理员姓名',
        trigger: 'blur'
      }],
      major_admin_phone: [{
        min: 11,
        max: 11,
        required: true,
        message: '请输入专业管理员手机',
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
        placeholder: '请输入专业名称',
        label: '专业名称'
      }, {
        type: 'input',
        model: 'major_admin_name',
        placeholder: '请输入专业管理员姓名',
        label: '专业管理员姓名'
      }, {
        type: 'input',
        inputType: 'number',
        model: 'major_admin_phone',
        placeholder: '请输入专业管理员手机',
        label: '专业管理员手机'
      }, {
        type: 'input',
        model: 'description',
        placeholder: '请输入班级描述',
        label: '班级描述'
      }]
    }
    async get_major_list() {
      try {
        const response = await this.majorService.get_major_list(this.query)
        if (response.code === 200) {
          this.majorList = response.data
        }
      } catch (e) {
        console.log(e);
      }
    }


    async submit() {
      delete this.model.class_num
      delete this.model.student_num
      try {
        const response = await this.majorService.create_major(this.model)
        if (response.code ===  200) {
          this.$message('新增专业成功');
        }
      } catch (e) {
        console.log(e);
      }
    }

    befor_import_major() {
      const el = document.querySelector('#import_file')
      if (el) {
        (el as any).click()
      }
    }
    async import_major($event: Event) {
      const formData = new FormData()
      formData.append('files', ($event.target as any).files[0])
      // formData.append('target_type', 'avatar')
      // formData.append('target_id', '65')
      try {
        const response = await this.majorService.import_major(formData)
        console.log(123);
        if (response.code === 200) {
          this.$message('导入专业成功')
        }
      } catch (e) {
        console.log(e);
      }
    }

    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new MajorQueryDto()
      majorService.get_major_list(query).then((resp: IResponse<Major[]>) => {
        next((vm: any) => {
          vm.majorList = resp.data;
          vm.query = query;
        })
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./major.scss";
</style>