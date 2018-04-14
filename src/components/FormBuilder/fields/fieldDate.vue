<template>
  <el-date-picker
    v-model="value"
    :placeholder="schema.placeholder"
    :editable="schema.editable"
    :clearable="schema.clearable"
    :format="schema.format"
    :type="schema.dateType"
    :align="schema.align"
    :popper-class="schema.popperClass"
    :picker-options="schema.pickerOptions"
    :range-separator="schema.rangeSeparator"
    :default-value="schema.defaultValue"
    :default-time="schema.defaultTime"
    :value-format="schema.valueFormat"
    :name="schema.name"
    :unlink-panels="schema.unlinkPanels"
    :prefix-icon="schema.prefixIcon"
    :clear-icon="schema.clearIcon"
    >
  </el-date-picker>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { get as objGet, forEach, isFunction, isString, isArray, debounce } from "lodash";
  import AbstractField from './abstractField';

  @Component({
    mixins: [AbstractField]
  })
  export default class InputComponent extends Vue {

    onBlur() {

    }

    onFoucs() {

    }

    onChange(value: string | number) {
      // (this as any).value = value
    }
  }
</script>