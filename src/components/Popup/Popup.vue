<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator";
  const template = require('./Popup.html')

  @Component({
    template: template
  })
  export default class PopupComponent extends Vue {
    @Prop({
      default: false
    })
    visible: boolean;

    @Watch('visible')
    onVisibleChange(val: boolean, oldValue: boolean) {
      if (val) document.body.appendChild(this.$el);
    }

    closePopup() {
      this.$emit('close')
    }
    
    mounted() {
      window.addEventListener('hashchange', this.closePopup);
    }

    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./Popup.scss";
</style>