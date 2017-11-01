<template>
    <div class="content">
      <Avatar src="http://k2.jsqq.net/uploads/allimg/1706/7_170629152344_5.jpg" size="large"/>
      <div>账号：1887003029</div>
      <div>名称：刘德华</div>
      <div>性别：男</div>
      <div>身份证号码：510703********9388 <span class="curs">修改</span></div>
      <div>电话号码：177****7362 <span class="curs">修改</span></div>
      <div>职位：店长</div>
      <div>权限：管理员</div>
      <Button class="hy_btn">修改密码</Button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'b_info',
    };
</script>

<style scoped>
  .content{
    padding: 0 20px;
    line-height: 30px;
  }
  .curs{
    cursor: pointer;
    color: #2d8cf0;
  }
  .curs:hover{
    color: #66368C;
  }
</style>
