<template>
  <el-cascader
    @change="onChange"
    @active-item-change="schema.handleItemChange"
    @blur="onBlur"
    @focus="onFocus"
    v-model="value"
    :placeholder="schema.placeholder"
    :options="schema.options"
    :props="schema.props"
    :separator="schema.separator"
    :popper-class="schema.popperClass"
    :disabled="schema.disabled"
    :expand-trigger="schema.expandTrigger"
    :show-all-levels="schema.showAllLevels"
    :change-on-select="schema.changeOnSelect"
  ></el-cascader>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { get as objGet, forEach, isFunction, isString, isArray, debounce } from "lodash";
  import AbstractField from './abstractField';

  @Component({
    mixins: [AbstractField]
    
  })
  export default class CascaderComponent extends Vue {

    onBlur() {

    }

    onFocus() {

    }

    onChange(value: string | number) {
      // (this as any).value = value
    }

    onItemChange(val: any) {
      console.log(val);
    }
  }
</script>
