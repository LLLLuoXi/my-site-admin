<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />
    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input
      type="textarea"
      v-model="form.description"
      :rows="6"
      placeholder="请输入文章描述"
    ></el-input>
    <!-- 文章头图 -->
    <Upload v-model="form.thumb" uploadTitle="文章头图" />
    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      placeholder="请选择文章分类"
      @change="changeHandler"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- 发布按钮 -->
    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addArticleHandler"
        >{{ btnContent }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
// import "highlight.js/styles/github.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Upload from "@/components/Upload.vue";
import { getBlogType } from "@/api/blogType";
import { addBlog, editBlog, findOneBlog } from "@/api/blog";
export default {
  props: ["mode"],
  data() {
    return {
      id: null, // 传递过来的id
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "", // 文章的图片
        select: "", // 选择分类
      },
      blogType: [], // 博客分类
      imageUrl: "", // 图片在服务器上面的地址
      editorOptions: {
        plugins: [codeSyntaxHighlight],
      },
      btnContent: "发布文章",
    };
  },
  created() {
    // 获取分类数据
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });
    if (this.mode === "edit") {
      this.btnContent = "确认修改";
      // 拿到传递的id 获取文章内容回填表单
      this.id = this.$route.params.id;
      findOneBlog(this.id).then(({ data }) => {
        this.form = data;
        this.form.select = data.category === null ? "" : data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      });
    }
  },
  components: { Editor, Upload },
  methods: {
    // 发布文章
    addArticleHandler() {
      // 获取表单内容
      // 发送请求
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        //toc传递一个空数组，服务器根据markdown的内容来生成toc
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.mode === "edit") {
          editBlog({ id: this.form.id, data: obj }).then(() => {
            this.$router.push("/blogList");
            this.$message.success("内容修改成功");
          });
        } else {
          // 添加文章
          addBlog(obj).then(() => {
            this.$router.push("/blogList");
            this.$message.success("添加文章成功");
          });
        }
      } else {
        this.$message.error("请填写所有内容");
      }
    },
    // el-select 强制更新视图
    changeHandler() {
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
