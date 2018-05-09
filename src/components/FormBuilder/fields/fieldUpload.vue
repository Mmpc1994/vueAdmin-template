<template>
  <el-upload
    :action="schema.action"
    :headers="schema.headers"
    :multiple="schema.multiple"
    :data="schema.data"
    :name="schema.name"
    :with-credentials="schema.credentials"
    :show-file-list="schema.showFileList"
    :drag="schema.drag"
    :accept="schema.accept"
    :list-type="schema.listType"
    :auto-upload="schema.autoUpload"
    :file-list="schema.fileList"
    :http-request="schema.request"
    :disabled="schema.disabled"
    :limit="schema.limit"
    :on-exceed="schema.exceed"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :on-success="onSuccess"
    :on-error="onError"
    :on-progress="onProgress"
    :on-change="onChange"
    :before-upload="schema.beforeUpload"
    :before-remove="schema.beforeRemove"
    >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" v-if="!schema.autoUpload">上传到服务器</el-button>
    <div class="el-upload__tip" slot="tip" v-if="schema.tip">{{schema.tip}}</div>
  </el-upload>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { get as objGet, forEach, isFunction, isString, isArray, debounce } from "lodash";
  import AbstractField from './abstractField';

  @Component({
    mixins: [AbstractField]
  })
  export default class UploadComponent extends Vue {
    onPreview() {}
    onRemove() {}
    onSuccess() {}
    onError() {}
    onProgress() {}
    onChange() {}
    
  }
</script>
