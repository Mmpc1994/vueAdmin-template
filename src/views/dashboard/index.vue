<template>
  <div class="dashboard-container">
    <div class="dashboard-heading dashboard-heading-background" :style="{'background-image': 'url(' + headerBg + ')'}">
      <div class="dashboard-avatar">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <div class="avatar-container">
          <a href="">mmmmpc</a>
          <span>lalallalalalalal</span>
          <p>alsdalsdalsjdlajdljl</p>
        </div>
      </div>
    </div>
    <div layout layout-align="center center" layout-margin="15px">
      <el-button type="primary">个人信息</el-button>
      <el-button type="primary">学籍信息</el-button>
      <el-button type="primary">实习信息</el-button>
      <el-button type="primary">系统信息</el-button>
    </div>

    <div layout layout-margin="15px">
      <el-card flex="60">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <ul>
          <li>
            姓名: 毛鹏程
          </li>
          <li>
            性别: 男
          </li>
          <li>
            生日
          </li>
          <li>联系电话</li>
        </ul>
      </el-card>
      <div flex="40">
        <el-card>
          <div slot="header" class="clearfix">
            <span>家庭联系人</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
        </el-card>

        <el-card style="margin-top: 15px">
          <div slot="header" class="clearfix">
            <span>地址信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { State, Getter } from 'vuex-class';
  import * as headerBg from '@/assets/header-2.png';

  @Component
  export default class Dashbord extends Vue{
    @Getter name: string;
    @Getter roles: string[];
    @Getter avatar: string;
    headerBg = headerBg;
    
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    line-height: 20px;
    .el-button--primary {
      background-color: #292f43;
      border-color: #232839;
    }
  }
  &-heading {
    padding: 55px 15px;
    border: 0;
    color: #fff;
  }

  &-heading-background {
    background-position: center center;
    background-repeat: no-repeat;
  }

  &-avatar {
    padding: 0 0 0 70px;
    position: relative;
    display: block;
    img {
      top: 0;
      width: 60px;
      border-radius: 50%;
      position: absolute;
      left: 0;
    }
  }
}

.avatar-container > a, .avatar-container > span , .avatar-container > p {
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  margin: 0;
  padding: 0;
  display: block;
  text-decoration: none;
}

.avatar-container > span {
  color: #7F8FA4;
}
</style>
