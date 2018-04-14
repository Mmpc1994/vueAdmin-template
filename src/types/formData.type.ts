interface validate {

}

export class FormDataBase {
  type: string;
  title: string;
  field: string;
  value: any;
}

interface Prop {
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  clearable?: boolean;
}

interface InputProp extends Prop {
  maxlength?: number;
  minlength?: number;
  autofocus?: boolean;
  label?: string;
}

interface TextareaProp extends Prop {
  maxlength?: number;
  minlength?: number;
  autofocus?: boolean;
  label?: string;
  rows?: number;
}

interface SelectProp extends Prop {
  // 是否多选
  multiple?: boolean;
  // 样式
  'popper-class'?: string;
}

interface RadioProp extends Prop {
  // 是否有边框
  border?: boolean;
}

interface CheckboxProp extends Prop {
  // 是否勾选
  checked?: boolean;
  // 是否边框
  border?: boolean;

  //选中的值
  'true-label': string | number;

  // 没选中的值
  'false-label': string | number;
}


interface SwitchProp extends Prop {

}


interface Option {
  label: string;
  value: string;
  disabled: string;
}


export class InputData extends FormDataBase {
  props?: InputProp;
}

export class TextareaData extends FormDataBase {
  props?: TextareaProp
}

// export class 