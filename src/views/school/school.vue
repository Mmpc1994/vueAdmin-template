<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import { School } from './model/school.model';
  import { schoolService } from './school.service'
  import { SchoolQueryDto } from './dto/school_query.dto';
  import { IResponse } from '../../services/http_client.service';
  import FormBuilder from '../../components/FormBuilder/FormBuilder.vue';
  import Popup from '../../components/Popup/Popup.vue';

  const template = require('./school.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class schoolComponent extends Vue {
    schoolService = schoolService;
    schoolList: School[] = [];
    visible = false;
    query = new SchoolQueryDto();
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
    model = new School()
    school_schema: any = {
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
    school_options = {
      label: true
    }

    query_options = {
      formClass: 'cp-school__searchBar'
    }

    query_schema: any = {
      fields: [{
        type: 'input',
        model: 'name',
        placeholder: '学校名称'
      }, {
        type: 'select',
        model: 'type',
        placeholder: '学校类别',
        options: [{
          label: '选项1',
          value: 0
        }, {
          label: '选项2',
          value: 2
        }]
      }, {
        type: 'input',
        model: 'admin_name',
        placeholder: '管理员名称'
      }, {
        type: 'input',
        model: 'province',
        placeholder: '所在省'
      }]
    }
    async search() {
      try {
        const response = await schoolService.get_school_list(this.query)
        this.schoolList = response.data;
      } catch (e) {

      }
    }
    async submit() {
      delete this.model.create_time
      delete this.model.is_deleted
      const response = await this.schoolService.add_school(this.model)
      if (response.code === 200) {
        this.$message('新增学校成功');
      }
    }

    async get_school_by_id(row: School) {
      console.log(row);
      if (row.id) {
        const response: IResponse<School> = await this.schoolService.get_school_by_id(row.id)
        if (response.code === 200) {
          Object.assign(this.model, response.data)
          this.visible = true;
        }
      }
    }
    
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new SchoolQueryDto()
      schoolService.get_school_list(query).then((resp: IResponse<School[]>) => {
        next((vm: any) => {
          vm.schoolList = resp.data;
          vm.query = query;
        })
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./school.scss";
</style>