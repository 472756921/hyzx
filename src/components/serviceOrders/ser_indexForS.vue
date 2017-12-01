<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="serser" placeholder="输入单号 / 顾客 / 技师" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
       <Button class="hy_btn" @click="newEm">新建服务单</Button>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col span="8"  v-for="(item, i) in order" key="i">
        <div class="order">
          <div>
            <div>
              <span class="orderTitle">
                <span>{{ item.orderClass==1?'服务单':'匿名服务单' }}</span>
                <span class="orderNumber">（单号：39838213478）</span>
              </span>
              <span class="orderDate">{{ item.date }}</span>
            </div>
            <Row :gutter="10">
              <Col  span="8">
                <span class="orderLititle">顾客姓名：</span>
                <span class="orderLiCon">{{ item.u_name }}</span>
              </Col>
              <Col  span="8">
                <span class="orderLititle">顾客电话：</span>
                <span class="orderLiCon">{{ item.phone }}</span>
              </Col>
              <Col  span="8">
                <span class="orderLititle">顾客等级：</span>
                <span class="orderLiCon">{{ item.live==0?'非会员':item.live==1?'普通会员':item.live==2?'白银会员':'黄金会员' }}</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">服务技师：</span>
                <span class="orderLiCon">{{ item.servicer }}</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">指定：</span>
                <span class="orderLiCon">{{ item.servicerIS==1?"是":"否" }}</span>
              </Col>
              <Col  span="8">
                <span class="orderLititle">服务房间：</span>
                <span class="orderLiCon">{{ item.room }}</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">是否售前：</span>
                <span class="orderLiCon">{{ item.per_sale }}</span>
              </Col>
            </Row>
          </div>
          <div>
            <div class="orderLititle">项目名称：</div>
            <div class="orderLiCon" v-for="(it,i) in item.p_name">
              {{ it.label }} &nbsp;<span class="price">￥{{ it.price }}</span>&nbsp;&nbsp; 实操：{{it.a_o}}&nbsp;&nbsp;赠送手工：{{it.g_h}}
            </div>
          </div>
          <div>
            <span class="orderLititle">卡扣产品：</span>
            <span class="orderLiCon" v-for="(it,i) in item.pr_list">
              霸王洗发露 <span class="orderNumber">X {{ it.number }}</span>
              &nbsp; <span class="price">￥ {{ it.price * it.number }}</span>&nbsp;&nbsp;
            </span>
          </div>
          <div><span class="orderLititle">卡扣疗程：</span>{{item.card_lc}}</div>
          <div class="prtotle">合计：<span class="price" style="font-size: 16px">￥{{ item.totle }}</span></div>
          <div  style="width: 25%;margin: 0 auto">
            <Button  class="hy_btn" @click="settlement">结算</Button>
            <Button type="ghost" @click="edit(i)">编辑</Button>
          </div>
        </div>
      </Col>
    </Row>

    <Modal  v-model="service" :title="serCard" @on-ok="ok"  >
      <Checkbox v-model="single"  :disabled="serCard=='修改服务单'?true:false">匿名服务单</Checkbox>
      <br/>
      <br/>
      <span>用户选择：</span>
      <Select v-model="model1" filterable style="width:200px" :disabled="serCard=='修改服务单'?true:false">
        <Option v-for="item in u_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>技师选择：</span>
      <Select v-model="model2" filterable style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>是否指定：</span>
      <Select v-model="model2_" style="width:200px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
      <br/>
      <br/>
      <span>是否售前：</span>
      <Select v-model="model4" style="width:200px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
      <br/>
      <br/>
      <span>房间选择：</span>
      <Select v-model="model5" style="width:200px">
        <Option v-for="item in r_list" :value="item.label" :key="item.label">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>服务时间：</span>
      <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" v-model="serviceDate"></DatePicker>
      <br/>
      <br/>
      <span v-if="serCard!='修改服务单'">项目选择：</span>
      <span v-if="serCard=='修改服务单'">增加项目：</span>
      <Select v-model="model6" multiple>
        <Option v-for="item in p_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
      <br/>
      <br/>
      <div v-if="serCard=='修改服务单'">已选项目：
        <span v-for="item in model8">{{ item.label }} <span class="price" >￥{{ item.price }}</span>&nbsp;&nbsp;</span>
      </div>
      <br/>
      <span v-if="serCard!='修改服务单'">产品选择：</span>
      <span v-if="serCard=='修改服务单'">增加产品：</span>
      <Select v-model="model7" multiple>
        <Option v-for="item in pr_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
      <br/>
      <br/>
      <div v-if="serCard=='修改服务单'">已选项目：
        <span v-for="item in model9">{{ item.label }} <span class="price" >￥{{ item.price }}</span>&nbsp;&nbsp;</span>
      </div>
    </Modal>

    <Modal  v-model="settlementF" title="结算" @on-ok="sok">
      <div>您正在结算服务单，点击确认后将打印单据，请保持打印机连接畅通</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_list} from '../../interface';

  export default {
    name: 'ser_indexForS',
    created() {
      this.getList(1);
      console.log(this.getAllClient())
    },
    data() {
      return {
        serCard: '创建服务单',
        serser: '',
        serviceDate: '',
        service: false,
        single: false,
        settlementF: false,
        model1: '',
        model2: '',
        model2_: '',
        model4: '',
        model5: '',
        model6: [],
        model7: [],
        model8: [],
        model9: [],
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
        order: [
          {
            orderClass: 1,
            orderNumber: '123123232',
            live: 1,
            phone: 12211121212,
            date: '2017-12-12',
            u_name: '王小虎',
            u_id: '2',
            servicer: '小黑',
            e_id: '1',
            servicerIS: 1,
            room: '303',
            per_sale: '小黑',
            aft_sale: '小黑',
            card_lc: '美体',
            p_name: [
              {
                value: '1',
                price: 1200.00,
                label: '美体',
                a_o: '不懂',
                g_h: '不懂',
              },
              {
                value: '2',
                price: 1100.00,
                label: '嫩肤',
                a_o: '不懂',
                g_h: '不懂',
              },
            ],
            per_id: '1',
            aft_id: '1',
            pr_list: [
              {
                value: '1',
                price: 10.00,
                number: '2',
                label: '宝宝霜',
              },
              {
                value: '2',
                number: '3',
                price: 30.00,
                label: '霸王洗发露',
              },
            ],
            totle: '300.00',
          },
          {
            orderClass: 2,
            orderNumber: '123123232',
            phone: 12211121212,
            date: '2017-12-12',
            u_name: '刘**',
            u_id: '1',
            live: 1,
            servicer: '小黑',
            e_id: '1',
            servicerIS: 1,
            room: '302',
            per_sale: '小黑',
            per_id: '1',
            aft_sale: '小黑',
            aft_id: '1',
            card_lc: '美体',
            p_name: [
              {
                value: '1',
                price: 1200.00,
                label: '美体',
                a_o: '不懂',
                g_h: '不懂',
              },
              {
                value: '2',
                price: 110.00,
                label: '嫩肤',
                a_o: '不懂',
                g_h: '不懂',
              },
            ],
            pr_list: [
              {
                value: '1',
                price: 10.00,
                number: '2',
                label: '宝宝霜',
              },
              {
                value: '2',
                number: '3',
                price: 30.00,
                label: '霸王洗发露',
              },
            ],
            totle: '300.00',
          },
        ],
      }
    },
    methods: {
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_list() + '?page='+page+'&pageSize=50',
        }).then((res) => {
          this.order = res.data.results;
        }).catch((error) => {
        });
      },
      ok() {
        console.log(this.model6);
      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户名字');
        }
      },
      newEm() {
        this.serCard = '新建服务单';
        this.service = true;
        this.single = false;
        this.model1 = '';
        this.model2 = '';
        this.model4 = '';
        this.serviceDate = '';
        this.model5 = '';
        this.model6 = [];
        this.model7 = [];
        this.model8 = [];
        this.model9 = [];
      },
      edit(i) {
        this.serCard = '修改服务单';
        this.service = true;
        const tem = this.order[i];
        if(tem.orderClass == 2){
          this.single = true;
        } else {
          this.single = false;
        }
        this.model1 = tem.u_id;
        this.model2 = tem.e_id;
        this.model4 = tem.aft_id;
        this.model5 = tem.room;
        this.model8 = tem.p_name;
        this.model9 = tem.pr_list;
        this.serviceDate = tem.date;
      },
      settlement() {
        this.settlementF = true;
      },
      sok() {
        var r=confirm("您确定结算该服务单 ？")
        if(r) {
          this.$Message.info({content:'结算完成，请用户签字', duration: 3});
        }
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
