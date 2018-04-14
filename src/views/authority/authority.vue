<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import { TreeNode } from './model/tree-node.model';
  import { IResponse } from '../../services/http_client.service';
  import { authService } from './authority.service';
  import { AuthCreateDto, IAuth } from './dto/auth_create.dto';
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import Popup from '@/components/Popup/Popup.vue';
  const template = require('./authority.html')
  
  @Component({
    template,
    components: {
      cpPopup: Popup,
      FormBuilder
    }
  })
  export default class AuthorityComponent extends Vue {
    visible = false;

    @Watch('visible')
    onVisibleChange(val: boolean, oldValue: boolean) {
      if (val === false) {
        (this.$refs.auth_form as any).reset()
      }
    }
    
    authService = authService;
    treeNode: TreeNode[] = [];
    defaultProps = {
      children: 'next_level_privileges',
      label: 'name',
      value: 'id'
    }

    options = {
      formClass: 'cp-auth__form'
    }

    model: any = {
      name: '',
      description: '',
      auth_select_list: []
    }

    rules = {
      name: [{
        required: true,
        message: '请输入权限名称',
        trigger: 'blur'
      }],
      description: [{
        required: true,
        message: '请输入权限描述',
        trigger: 'blur'
      }]
    }

    schema: any = {
      fields: [{
        type: 'cascader',
        model: 'auth_select_list',
        label: '上级权限',
        placeholder: '请选择上级权限',
        changeOnSelect: true,
        options: [],
        props: {
          children: 'next_level_privileges',
          label: 'name',
          value: 'id'
        }
      }, {
        type: 'input',
        model: 'name',
        placeholder: '请输入权限名',
        label: '权限名称'
      }, {
        type: 'input',
        model: 'description',
        placeholder: '请输入权限描述',
        label: '权限描述'
      }]
    }

    async submit() {
      const query: AuthCreateDto = {
        type: '',
        privilege: this.model
      }
      switch(this.model.auth_select_list.length) {
        case 0:
          query.type = 'L1_Privilege';
          break
        case 1:
          query.type = 'L2_Privilege';
          query.privilege.l1_id = this.model.auth_select_list[0];
          break;
        case 2:
          query.type = 'L3_Privilege';
          query.privilege.l1_id = this.model.auth_select_list[0];
          query.privilege.l2_id = this.model.auth_select_list[1];
          break;
      }
      try {
        delete this.model.auth_select_list;
        const response: IResponse<any> = await this.authService.create_new_privilege(query);
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '新增权限成功'
          });
          authService.get_platform_all_privilege().then((resp: IResponse<TreeNode[]>) => {
            this.treeNode = resp.data;
          })
        }
      } catch (e) {

      }
    }
    
    hint(data: any) {
      this.visible = true;
      this.model.name = data.name;
      this.model.description = data.description;
      this.model.id = data.id
      this.model.auth_select_list = [];

      if (data.l1_id) {
        this.model.auth_select_list.push(data.l1_id)
      }
      if (data.l2_id) {
        this.model.auth_select_list.push(data.l2_id)
      }
    }
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      authService.get_platform_all_privilege().then((resp: IResponse<TreeNode[]>) => {
        next((vm: any) => {
          vm.treeNode = resp.data;
          vm.schema.fields[0].options = resp.data;
        })
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./authority.scss";
</style>