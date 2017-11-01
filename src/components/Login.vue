<template>
  <div class="content">
    <div class="box">
      <h1>华扬咨询后台系统</h1>
      <div class="box2">
        <input type="text" placeholder="账号"/>
        <input type="password" placeholder="密码"/><br/><br/>
        <Checkbox v-model="rember">记住密码</Checkbox><br/>
        <Button type="ghost" class="loginBtn">登录</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Login',
    data(){
      return {
        rember: false,
      };
    },
  };
</script>

<style scoped>
  .content{
    height:100%;
    background: url("/static/bk.png");
  }
  .box{
    padding: 60px 10px;
    color: #fff;
    width: 500px;
    margin: 0 auto;
    z-index: 2;
    position: relative;
  }
  h1{
    text-align: center;
  }
  .box2{
    margin: 20px auto;
    padding: 50px 30px;
    background-color:rgba(0,0,0,0.1);
    overflow: auto;
  }
  input{
    border: #fff;
    margin: 4px;
    height: 30px;
    width: 200px;
    padding: 4px;
    color: #666;
    font-size: 14px;
    border-radius: 4px;
  }
  .loginBtn{
    color: #ffffff;
    font-size: 14px;
    margin-top: 10px;
  }
</style>
