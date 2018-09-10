<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import PopupComponent from '@/components/Popup/Popup.vue';
  import { agentService } from './agent.service';
  import { Route } from 'vue-router';
  import { AgentQueryRequestDTO } from './dtos/agent_query.dto';
  import { User } from '../user/model/user.model';
  import { userService } from "../user/user.service";
  const template = require('./agent.html')

  @Component({
    template,
    components: {
      FormBuilder,
      PopupComponent
    }
  })
  export default class agent extends Vue {
    total = 0;
    visible = false;
    dataList: User[] = [];
    query_schema = {
      fields: [{
        type: 'input',
        placeholder: '请输入代理商名称',
        model: 'companyName'
      }, {
        type: 'input',
        placeholder: '公司电话',
        model: 'companyMobile'
      }]
    }
    options = {
      label: true
    }
    schema = {
      fields: [{
        type: 'input',
        label: '请输入公司名称',
        model: 'name'
      }, {
        type: 'input',
        label: '用户名',
        model: 'name'
      }, {
        type: 'input',
        label: '密码',
        model: 'name'
      }, {
        type: 'input',
        label: '地址',
        model: 'name'
      }, {
        type: 'input',
        label: '联系人手机',
        model: 'name'
      }, {
        type: 'input',
        label: '邮箱',
        model: 'name'
      }]
    }
    async search(current: number =  1) {
      const query = new AgentQueryRequestDTO();
      query.pageNo = current;
      const response = await agentService.getAgentList(query);
      if (response.code === 200) {
        this.dataList = response.data.content;
        this.total = response.data.totalElements;
      }
    }

    updateStatus(row: User, isPass: boolean) {
      const message = isPass ? '您确定要启用此代理商吗?' : '您确定要禁用此代理商么?';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const user = new User();
        user.roles = row.roles.map(val => {
          return val.name
        })
        user.id = row.id;
        user.status = isPass ? 1 : 2;
        this.update(user)
      })
    }

    approve(row: User) {
      const user = new User();
      user.roles = row.roles.map(val => {
        return val.name
      })
      user.id = row.id;
      this.$confirm('您是否通过审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '拒绝',
        distinguishCancelAndClose: true,
        type: 'warning'
      } as any).then(() => {
        user.status = 1;
        this.update(user);
      }).catch((action) => {
        console.log(action);
        if (action === 'cancel') {
          user.status = 2;
          this.update(user);
        }
      })
    }

    async update(row: User) {
      const response = await userService.update(row);
      if (response.code === 200) {
        this.$message('操作成功');
        this.search();
      }
    }
    save() {
      
    }
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      next((vm: any) => {
        vm.search();
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./agent.scss";
</style>