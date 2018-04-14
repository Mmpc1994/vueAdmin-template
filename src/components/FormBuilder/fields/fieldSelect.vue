<template>
  <el-select
    v-model="value"
    @blur="onBlur"
    @focus="onFocus"
    @change="onChange"
    @remove-tag="onRemoveTag"
    :size="schema.size"
    :placeholder="schema.placeholder"
    :popper-class="schema.popperClass"
    :no-data-text="schema.noDataText"
    :disabled="schema.disabled"
    :multiple="schema.multiple">
    <el-option 
      v-for="(item, index) in schema.options"
      :key="index"
      :value="item.value"
      :label="item.label"
      :disabled="item.disabled"
      ></el-option>
  </el-select>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { get as objGet, forEach, isFunction, isString, isArray, debounce } from "lodash";
  import AbstractField from './abstractField';

  @Component({
    mixins: [AbstractField]
  })
  export default class SelectComponent extends Vue {

    onItemChange() {}

    onChange() {}

    onRemoveTag() {}

    onBlur() {}

    onFocus() {}
  }
</script>

<style lang="scss">
  .form-builder {
    .el-select {
      width: 100%;
    }
  }
</style>
  
