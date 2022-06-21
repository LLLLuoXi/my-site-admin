<!--
 * @Author: luoxi
 * @LastEditTime: 2022-06-21 01:04:25
 * @LastEditors: your name
 * @Description: 
-->

<template>
  <div class="uplaod-container">
    <!-- 上传组件标题 -->
    <div class="block">{{ uplaodTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from "@/urlConfig";
export default {
  props: ["uplaodTitle", "value"],
  emit: ["input"],
  computed: {
    imageUrl() {
      if (this.value) {
        return server_URL + this.value;
      }
    },
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log("上传成功的回调");
      console.log("res", res);
      if (!res.code && res.data) {
        // 上传成功，服务器返回图片上传后的服务器地址
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uplaod-container {
  .block {
    margin: 15px 0;
    font-weight: 100;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
