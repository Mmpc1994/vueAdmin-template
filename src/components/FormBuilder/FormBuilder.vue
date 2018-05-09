<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { get as objGet, forEach, isFunction, isNil, isArray, isString } from "lodash";
  const template = require('./FormBuilder.html')

  let fieldComponents: any = {};
  let coreFields = (require as any).context('./fields', false, /^\.\/field([\w-_]+)\.vue$/)

  forEach(coreFields.keys(), (key: string) => {
    let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
		fieldComponents[compName] = coreFields(key).default
  });
  

  @Component({
    template: template,
    components: fieldComponents
  })
  export default class FormBuilder extends Vue {
    @Prop()
    schema: object;

    @Prop()
    model: object;

    @Prop()
    rules: any

    @Prop({
      default: () => {
        return {}
      }
    })
    options: object;

    get fields() {
      const res: any[] = [];
      if (this.schema && (this.schema as any).fields) {
        forEach((this.schema as any).fields, (field: any) => {
          res.push(field)
        })
      }
      return res
    }

    async submit() {
      const promise = new Promise((resolve, reject) => {
        (this.$refs.formBuilder as any).validate((valid: boolean) => {
          if (valid) {
            this.$emit('submit')
          }
          resolve(valid)
        })
      })
      return promise
    }

    reset() {
      (this.$refs.formBuilder as any).resetFields()
    }

    getFieldType(fieldSchema: any) {
      const type = fieldSchema.type.toLowerCase().replace(/( |^)[a-z]/g, (L:string) => L.toUpperCase());
      return  `field${type}`
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./FormBuilder.scss";
</style>