import { Vue, Component, Prop } from "vue-property-decorator";
import { get as objGet, forEach, isFunction, isString, isArray, debounce } from "lodash";
import { Schema } from "../formBuilder.service";

@Component
export default class AbstractField extends Vue {
  @Prop({
    default: () => new Schema()
  })
  schema: Schema

  @Prop({
    default: () => {}
  })
  model: object

  get value() {
    let val: any;
    if (isFunction(this.schema.get)) {
      val = this.schema.get(this.model)
    } else if (this.model && this.schema.model) {
      val = objGet(this.model, this.schema.model)
    }
    return this.formatValueToField(val)
  }

  set value(newValue) {
    const oldValue = this.value;
    newValue = this.formatValueToModel(newValue);

    if(isFunction(newValue)) {
      newValue(newValue, oldValue);
    } else {
      this.updateModelValue(newValue, oldValue);
    }
  }

  updateModelValue(newValue: any, oldValue: any) {
    let changed = false;
    if (isFunction(this.schema.set)) {
      this.schema.set(this.model, newValue);
      changed = true;
    } else if (this.schema.model) {
      this.setModelValueByPath(this.schema.model, newValue);
      changed = true;
    }
  }

  setModelValueByPath(path: any, value: any) {
    let s = path.replace(/\[(\w+)\]/g, ".$1");

    // strip a leading dot
    s = s.replace(/^\./, "");

    let o: any = this.model;
    const a = s.split(".");
    let i = 0;
    const n = a.length;
    while (i < n) {
      let k = a[i];
      if (i < n - 1)
        if (o[k] !== undefined) {
          // Found parent property. Step in
          o = o[k];
        } else {
          // Create missing property (new level)
          this.$root.$set(o, k, {});
          o = o[k];
        }
      else {
        // Set final property value
        this.$root.$set(o, k, value);
        return;
      }
      ++i;
    }
  }

  formatValueToField(value: any) {
    return value;
  }

  formatValueToModel(value: any) {
    return value;
  }
}