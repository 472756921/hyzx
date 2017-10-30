<template>
  <div>
    <h3>用户信息</h3>
    <br/>
    <div>用户名：刘德华，年龄：22，电话：17780030394，身份证：510393188382839499，等级：白金会员</div>
    <br/>
    <Tabs value="name1">
      <TabPane label="服务记录" name="name1"><serviceList/></TabPane>
      <TabPane label="消费记录(现金)" name="name2"><shopList/></TabPane>
      <TabPane label="问题分析" name="name3"><questionList/></TabPane>
      <TabPane label="现有卡情况" name="name4"><cardList/></TabPane>
      <TabPane label="计划图" name="name5"><uplan/></TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import serviceList from './u_serviceList.vue';
  import shopList from './u_shopList.vue';
  import questionList from './u_questionList.vue';
  import cardList from './u_cardList.vue';
  import uplan from './u_plan.vue';

  export default {
    name: 'u_datile',
    components: { serviceList, shopList, questionList, cardList, uplan},
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
