<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import searchBar from '@/components/searchbar/searchbar.vue';
    import Table, { TableTitle} from '@/types/table.ts';
    import Student from '@/types/Student.ts';
    const template = require('./summary.html')
  
    @Component({
      template,
      components: {
        searchBar
      }
    })
    export default class summary extends Vue {
      studentTable = new Table(new Student())
    }
  </script>
  
  <style lang="scss">
    @import "src/styles/variables","src/styles/mixins";
    @import "./summary.scss";
  </style>