<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { Route } from 'vue-router';
  import FormBuilder from '../../../components/FormBuilder/FormBuilder.vue';
  import { studentService } from './student.service';
  import { majorService } from '../major/major.service';
  import { classService } from '../class/class.service';
  import { ClassQueryDto } from '../class/dto/class_query.dto';
  import { Class } from '../class/model/class.model';
  import { Major } from '../major/model/major.model';
  import { Student } from './model/student.model';
  import { IResponse } from '../../../services/http_client.service';
  import { StudentQueryDto } from './dto/student_query.dto';
  import Popup from '../../../components/Popup/Popup.vue';


  const template = require('./student.html')

  @Component({
    template: template,
    components: {
      FormBuilder,
      Popup
    }
  })
  export default class studentComponent extends Vue {
    studentService = studentService;
    majorService = majorService;
    majorList: Major[] = [];
    studentList:Student[] = [];
    visible = false;
    query = new StudentQueryDto();
    model = new Student()
    options = {
      label: true
    }
    query_schema = {
      fields: [{
        type: 'input',
        model: 'major_name',
        placeholder: '专业名称'
      }, {
        type: 'input',
        model: 'class_name',
        placeholder: '班级名称'
      }]
    }
    rules = {
      name: [{
        required: true,
        message: '请输入学生姓名',
        trigger: 'blur'
      }],
      phone: [{
        required: true,
        min: 11,
        max: 11,
        message: '请输入合法手机号',
        trigger: 'blur'
      }],
      birth_date: [{
        required: true,
        message: "请选择出身日期",
        trigger: 'change'
      }],
    }
    handleItemChange(val: any[]) {
      const query = new ClassQueryDto()
      query.major_id = val[0]
      const index = this.majorList.findIndex((major: Major) => {
        return major.id === val[0]
      })
      if (index !== -1) {
        classService.get_class_list(query).then((resp: IResponse<Class[]>) => {
          (this.majorList[index] as any).classes = resp.data
        })
      }
    }
    
    schema = {
      fields: [{
        type: 'cascader',
        model: 'preconditions',
        placeholder: '请选择专业班级',
        label: '专业班级',
        props: {
          value: 'id',
          label: 'name',
          children: 'classes'
        },
        handleItemChange: this.handleItemChange,
        options: []
      }, {
        type: 'input',
        model: 'school_num',
        placeholder: '请输入学号',
        label: '学号'
      }, {
        type: 'input',
        model: 'name',
        placeholder: '请输入学生姓名',
        label: '学生姓名'
      }, {
        type: 'input',
        model: 'phone',
        inputType: 'number',
        placeholder: '请输入手机号',
        label: '手机号'
      }, {
        type: 'select',
        model: 'sex',
        placeholder: '请选择性别',
        label: '性别',
        options: [{
          label: '男',
          value: '男'
        }, {
          label: '女',
          value: '女'
        }]
      }, {
        type: 'date',
        model: 'birth_date',
        placeholder: '请选择出身日期',
        label: '出身日期'
      }, {
        type: 'input',
        model: 'nation',
        placeholder: '请输入民族',
        label: '民族'
      }, {
        type: 'input',
        model: 'id_num',
        placeholder: '请输身份证号',
        label: '身份证号'
      }, {
        type: 'date',
        model: 'entrance_date',
        placeholder: '请输入入学日期',
        label: '入学日期'
      }, {
        type: 'input',
        model: 'student_type',
        placeholder: '请输入学生类型',
        label: '学生类型'
      }, {
        type: 'input',
        model: 'school_year',
        inputType: 'number',
        placeholder: '请输入学制年限',
        label: '学制年限'
      }, {
        type: 'select',
        model: 'politics',
        placeholder: '请输入政治面貌',
        label: '政治面貌',
        options: [{
          label: '群众',
          value: '群众'
        }, {
          label: '团员',
          value: '团员'
        }, {
          label: '党员',
          value: '党员'
        }]
      }, {
        type: 'input',
        model: 'middle_school',
        placeholder: '请输入毕业学校',
        label: '毕业学校'
      }, {
        type: 'input',
        model: 'guarder_name',
        placeholder: '请输入监护人姓名',
        label: '监护人姓名'
      }, {
        type: 'input',
        model: 'guarder_phone',
        placeholder: '请输入监护人电话',
        label: '监护人电话'
      }, {
        type: 'input',
        model: 'hukou_province',
        placeholder: '请输入户口所在省份',
        label: '户口所在省份'
      }, {
        type: 'input',
        model: 'hukou_city',
        placeholder: '请输入户口所在市区',
        label: '户口所在市区'
      }, {
        type: 'input',
        model: 'hukou_county',
        placeholder: '请输入户口所在区县',
        label: '户口所在区县'
      }, {
        type: 'input',
        model: 'hukou_address',
        placeholder: '请输入户口详细地址',
        label: '户口详细地址'
      }]
    }
    async get_student_info(row: Student) {
      if (row.id) {
        const response = await this.studentService.get_student_info(row.id)
        if (response.code === 200) {
          Object.assign(this.model, response.data)
          this.visible = true;
        }
      }
    }

    async before_add_new_student() {
      try {
        const response = await this.majorService.get_major_list({} as any)
        if (response.code === 200) {
          this.majorList = (this.schema.fields[0] as any).options = response.data.map((val: Major) => {
            (val as any).classes = []
            return val
          })
          this.visible = true;
        }

      } catch (e) {
        console.log(e);
      }
    }

    async submit() {
      try {
        const response = await this.studentService.add_student(this.model);
        if (response.code === 200) {
          this.$message('新增学生成功')
          this.studentService.get_student_list(this.query).then((resp: IResponse<Student[]>) => {
            if (resp.code === 200) {
              this.studentList = resp.data
            }
          })
        }
      } catch (e) {
        console.log(e);
      }
    }
    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
      const query = new StudentQueryDto()
      studentService.get_student_list(query).then((resp: IResponse<Student[]>) => {
        next((vm: any) => {
          vm.studentList = resp.data;
          vm.query = query;
        })
      })
    }
  }
</script>

<style lang="scss">
  @import "src/styles/variables","src/styles/mixins";
  @import "./student.scss";
</style>