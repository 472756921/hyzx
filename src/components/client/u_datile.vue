<template>
  <div>
    <h3>用户信息</h3>
    <br/>
    <div>用户名：刘德华，年龄：22，电话：17780030394，身份证：510393188382839499，等级：白金会员</div>
    <br/>
    <Tabs value="name1">
      <TabPane label="服务记录" name="name1">
        <Table :columns="service" :data="serviceData"></Table>
      </TabPane>
      <TabPane label="消费记录" name="name2">标签二的内容</TabPane>
      <TabPane label="问题分析" name="name3">标签三的内容</TabPane>
      <TabPane label="现有卡情况" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_datile',
    data(){
      return {
        service: [
          {key: 'date', title: '日期'},
          {key: 'e_name', title: '技师'},
        ],
        serviceData: [
          {date: '2012-12-12', e_name: '张小泉'},
        ],
      };
    },
  };
</script>

<style scoped>

</style>
