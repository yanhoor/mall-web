# mall-web

## 技术栈

`Vue3 + Vue-router + Vuex + Vue-cli + TypeScript + Ant-design + Less`

## 插件使用

### Ant-design

#### 引入项目

- `cnpm i -S babel-plugin-import`

- `babel.config.js` 配置

  ```JavaScript
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
      ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"] // 注意没有style
    ]
  }
  ```

- `main.js` 引入 `import 'ant-design-vue/dist/antd.css`

#### 表单校验

```vue
<template>
  <!--注意绑定model、rules-->
  <Form layout="inline" :model="form" :rules="rules">
      <!--注意name-->
      <Form-item label="姓名" name="name">
          <Input placeholder="请输入姓名" v-model:value="form.name"/>
      </Form-item>
  </Form>
</template>

<script >
  export default{
    data(){
      return {
        form: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
          ]
        }
      }
    }
  }
</script>
```
