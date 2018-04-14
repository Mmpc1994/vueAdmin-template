<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { School } from '../school/model/school.model'
  import { schoolService } from '../school/school.service';
  import FormBuilder from '../../components/FormBuilder/FormBuilder.vue';
  import Popup from '../../components/Popup/Popup.vue';
  const template = require('./school_create.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class school_create extends Vue {
    schoolService = schoolService
    model = new School()
    visible = false;

    options = {
      label: true,
      labelWidth: '120px'
    }
    rules = {
      name: [{
        required: true,
        message: '请输入学校名称',
        trigger: 'blur'
      }],
      type: [{
        required: true,
        message: '请选择学校类型',
        trigger: 'change'
      }],
      admin_name: [{
        required: true,
        message: '请输入管理员姓名',
        trigger: 'blur'
      }],
      admin_phone: [{
        required: true,
        min: 11,
        max: 11,
        message: '请输入合法的管理员手机号',
        trigger: 'blur'
      }],
      province: [{
        required: true,
        message: '请输入所在省',
        trigger: 'blur'
      }],
      city: [{
        required: true,
        message: '请输入所在市',
        trigger: 'blur'
      }],
      address: [{
        required: true,
        message: '请输入详细地址',
        trigger: 'blur'
      }],
      cooperation_type: [{
        required: true,
        message: '请输入合作方式',
        trigger: 'blur'
      }],
      description: [{
        required: true,
        message: '请输入备注描述',
        trigger: 'blur'
      }]
    }
    schema: any = {
      fields: [{
        type: 'input',
        label: '学校名称',
        model: 'name',
        placeholder: '请输入学校名称'
      }, {
        type: 'select',
        label: '学校类型',
        model: 'type',
        placeholder: '请选择学校类型',
        options: [{
          label: '中专',
          value: '中专'
        }]
      }, {
        type: 'input',
        label: '管理员手机号',
        inputType: 'number',
        model: 'admin_phone',
        placeholder: '请输入管理员手机号',
      }, {
        type: 'input',
        label: '管理员姓名',
        model: 'admin_name',
        placeholder: '请输入管理员姓名'
      }, {
        type: 'input',
        label: '所在省',
        model: 'province',
        placeholder: '请输入所在省'
      }, {
        type: 'input',
        label: '所在市',
        model: 'city',
        placeholder: '请输入所在市'
      }, {
        type: 'input',
        label: '详细地址',
        model: 'address',
        placeholder: '请输入详细地址'
      }, {
        type: 'input',
        label: '合作方式',
        model: 'cooperation_type',
        placeholder: '请输入合作方式'
      }, {
        type: 'input',
        label: '备注描述',
        model: 'description',
        placeholder: '请输入备注描述'
      }]
    }

    async submit() {
      delete this.model.create_time
      delete this.model.is_deleted
      const response = await this.schoolService.add_school(this.model)
      if (response.code === 200) {
        this.$message('新增学校成功');
      }
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./school_create.scss";
</style>