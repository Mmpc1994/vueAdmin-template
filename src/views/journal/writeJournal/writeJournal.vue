<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import  wordPad from '../components/wordPad/wordPad.vue';
  const template = require('./writeJournal.html')

  @Component({
    template: template,
    components: {
      wordPad
    }
  })
  export default class writeJournal extends Vue {
    
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./writeJournal.scss";
</style>