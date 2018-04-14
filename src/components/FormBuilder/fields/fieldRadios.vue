<template>
  <el-radio-group 
    @change="onChange"
    :size="schema.size"
    :fill="schema.fill"
    :text-color="schema.textColor"
    :disabled="schema.disabled">
    <el-radio 
      v-for="(item, index) in schema.options" 
      :lebel="item.value"
      :disabled="item.disabled"
      :border="schema.border"
      :name="item.name"
      :key="index">{{item.label || item.value}}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";

  @Component({})
  export default class InputComponent extends Vue {
    @Prop({
      default: () => {
        return {
          type: 'radio',
          options: []
        }
      }
    })
    schema: object;

    onItemChange() {}

    onChange() {}
  }
</script>