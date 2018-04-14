<template>
  <el-input 
    v-model="value"
    :placeholder="schema.placeholder"
    :type="schema.inputType"
    :maxlength="schema.maxlength"
    :minlength="schema.minlength"
    :clearable="schema.clearable"
    :disabled="schema.disabled"
    :prefix-icon="schema.prefixIcon"
    :suffix-icon="schema.suffixIcon"
    :rows="schema.rows"
    :autosize="schema.autosize"
    :name="schema.name"
    :readonly="schema.readonly"
    :step="schema.step"
    :resize="schema.resize"
    :label="schema.label"
    :tabindex="schema.tabindex"
    @change="onChange"
    @blur="onBlur"
    @focus="onFoucs"
    ></el-input>
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
