<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="serser" placeholder="用户姓名" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
       <Button class="hy_btn" @click="newEm">新建服务单</Button>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col span="8"  v-for="item in 3">
        <div class="order">
          <div>
            <div>
              <span class="orderTitle">服务单<span class="orderNumber">（单号：39838213478）</span></span>
              <span class="orderDate">2012-02-21</span>
            </div>
            <Row :gutter="10">
              <Col  span="8">
                <span class="orderLititle">顾客姓名：</span>
                <span class="orderLiCon">刘德华</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">服务技师：</span>
                <span class="orderLiCon">小黑</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">指定：</span>
                <span class="orderLiCon">否</span>
              </Col>
              <Col  span="8">
                <span class="orderLititle">服务房间：</span>
                <span class="orderLiCon">102</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">售前：</span>
                <span class="orderLiCon">小黑</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">售后：</span>
                <span class="orderLiCon">小黑</span>
              </Col>
            </Row>
          </div>
          <div>
            <span class="orderLititle">项目名称：</span>
            <span class="orderLiCon"> 面部护理 &nbsp;<span class="price">￥300.00</span> &nbsp;&nbsp;</span>
            <span class="orderLiCon"> 面部护理 &nbsp;<span class="price">￥300.00</span> &nbsp;&nbsp;</span>
            <span class="orderLiCon"> 面部护理 &nbsp;<span class="price">￥300.00</span> &nbsp;&nbsp;</span>
          </div>
          <div>
            <span class="orderLititle">产品名称：</span>
            <span class="orderLiCon">霸王洗发露 <span class="orderNumber">X 2</span> &nbsp; <span class="price">￥300.00</span>&nbsp;&nbsp;</span>
            <span class="orderLiCon">康王洗发露 <span class="orderNumber">X 2</span> &nbsp; &nbsp;&nbsp;</span>
          </div>
          <div class="prtotle">合计：<span class="price" style="font-size: 16px">￥300.00</span></div>
          <div  style="width: 25%;margin: 0 auto">
            <Button  class="hy_btn">结算</Button>
            <Button type="ghost" @click="edit">编辑</Button>
          </div>
        </div>
      </Col>
    </Row>

    <Modal  v-model="service" :title="serCard" @on-ok="ok"  >
      <Checkbox v-model="single" v-if="serCard!='修改服务单'">匿名服务单</Checkbox>
      <br v-if="serCard!='修改服务单'"/>
      <br v-if="serCard!='修改服务单'"/>
      <span>用户选择：</span>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in u_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>技师选择：</span>
      <Select v-model="model2" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>售前选择：</span>
      <Select v-model="model3" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>售后选择：</span>
      <Select v-model="model4" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>房间选择：</span>
      <Select v-model="model5" style="width:200px">
        <Option v-for="item in r_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>服务时间：</span>
      <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" v-model="serviceDate"></DatePicker>
      <br/>
      <br/>
      <span>项目选择：</span>
      <Select v-model="model6" multiple>
        <Option v-for="item in p_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
      <br/>
      <br/>
      <span>产品选择：</span>
      <Select v-model="model7" multiple>
        <Option v-for="item in pr_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ser_index',
    data() {
      return {
        serCard: '创建服务单',
        serser: '',
        serviceDate: '',
        service: false,
        single: '',
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        model5: '',
        model6: [],
        model7: [],
        e_list: [
          {
            value: '1',
            label: '小黑'
          },
          {
            value: '2',
            label: '小白'
          },
        ],
        r_list: [
          {
            value: '302',
            label: '302'
          },
          {
            value: '303',
            label: '303'
          },
        ],
        p_list: [
          {
            value: '1',
            price: '1200.00',
            label: '美体',
          },
          {
            value: '2',
            price: '1100.00',
            label: '嫩肤',
          },
        ],
        pr_list: [
          {
            value: '1',
            price: '10.00',
            label: '宝宝霜',
          },
          {
            value: '2',
            price: '30.00',
            label: '霸王洗发露',
          },
        ],
        u_list: [
          {
            value: '1',
            label: '刘德华',
          },
          {
            value: '2',
            label: '王小虎',
          },
        ],
      }
    },
    methods: {
      ok() {},
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户名字');
        }
      },
      newEm() {
        this.service = true;
      },
      edit() {
        this.serCard = '修改服务单';
        this.service = true;
      },
    },
  };
</script>

<style scoped>
  .orderLititle{
    color: #999;
  }
  .orderNumber{
    font-size: 12px;
    color: #999;
  }
  .orderTitle{
    font-size: 18px;
    color: #66368C;
  }
  .orderDate{
    float: right;
  }
  .serc{
    cursor: pointer;
  }
  .order{
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 20px 20px!important;
  }
  .price{
    color: red;
    font-size: 14px;
  }
  .prtotle{
    font-size: 16px;
  }
</style>
