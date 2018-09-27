<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { ServiceChargesSaveDTO, ServiceChargeDTO } from './dtos/service_charges.dto';
  import Popup from '@/components/Popup/Popup.vue';
  import FormBuilder from '@/components/FormBuilder/FormBuilder.vue';
  import { serviceChargeService } from './service_charges.service';
  import { Pagination } from '../../dtos/pagination';
  const template = require('./service_charges.html')

  @Component({
    template: template,
    components: {
      Popup,
      FormBuilder
    }
  })
  export default class service_charges extends Vue {
    model = new ServiceChargesSaveDTO();
    query = new Pagination();
    serviceChargeList : ServiceChargeDTO[] = [];
    visible = false;
    options = {
      label: true
    }

    async submit() {
      if (this.model.id) {
        const response = await serviceChargeService.update(this.model);
        if (response.code === 200) {
          this.$message('编辑服务费成功');
          this.getList();
          this.visible = false;
        }
      } else {
        const response = await serviceChargeService.save(this.model);
        if (response.code === 200) {
          this.$message('新增服务费成功');
          this.getList();
          this.visible = false;
        }
      }
    }
    async getList() {
      this.query.pageSize = 100;
      const response = await serviceChargeService.getList(this.query);
      if (response.code === 200) {
        this.serviceChargeList = response.data.content.filter((val) => {
          return val.usageType === 'air'
        })
      }
    }

    remove(row: ServiceChargeDTO) {
      this.$confirm('是否删除该项服务费?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await serviceChargeService.remove(row.id);
        if (response.code === 200) {
          this.$message('删除成功');
          this.getList();
        }
      }).catch(() => {
        this.$message('取消删除');
      })
    }

    edit(row: ServiceChargeDTO) {
      Object.assign(this.model, row);
      this.visible = true;
    }
    getUsage(usage: string) {
      switch(usage) {
        case 'train':
          return '火车票';
        case 'airplane':
          return '飞机票';
        case 'air':
          return '同业服务费'
      }
    }
    mounted() {
      this.getList()
    }
    schema = {
      fields: [{
        type: 'input',
        model: 'money',
        label: '费用',
        placeholder: '请输入费用'
      }, {
        type: 'select',
        model: 'type',
        label: '服务费类型',
        placeholder: '请选择服务费类型',
        options: [{
          label: '明加服务费',
          value: 0
        }, {
          label: '暗加服务费',
          value: 1
        }]
      }, {
        type: 'select',
        model: 'usageType',
        label: '用途',
        options: [{
          label: '同业服务费',
          value: 'air'
        }]
      }, {
        type: 'select',
        model: 'isActive',
        label: '是否启用',
        options: [{
          label: '立刻启用',
          value: true,
        }, {
          label: '不启用',
          value: false
        }]
      }]
    }
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./service_charges.scss";
</style>