<template>
  <div>
    <h3>用户信息</h3>
    <br/>
    <div>用户名：刘德华，年龄：22，电话：17780030394，身份证：510393188382839499，等级：白金会员</div>
    <br/>
    <Tabs value="name1">
      <TabPane label="服务记录" name="name1">
      </TabPane>
      <TabPane label="消费记录(现金)" name="name2">
      </TabPane>
      <TabPane label="问题分析" name="name3">
      </TabPane>
      <TabPane label="现有卡情况" name="name4">
      </TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_datile',
    data(){
      return {
      };
    },
    methods: {
    },
  };
</script>

<style scoped>
</style>
