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
                <span>{{ item.anonymous?'服务单':'匿名服务单' }}</span>
                <span class="orderNumber">（单号：{{item.serviceOrderNumber}}）</span>
              </span>
              <span class="orderDate">{{ item.date }}</span>
            </div>
            <Row :gutter="10">
              <Col  span="8">
                <span class="orderLititle">顾客姓名：</span>
                <span class="orderLiCon">{{ item.customer }}</span>
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
                <span class="orderLiCon">{{ item.operatorName }}</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">指定：</span>
                <span class="orderLiCon">{{ item.appoint==1?"是":"否" }}</span>
              </Col>
              <Col  span="8">
                <span class="orderLititle">服务房间：</span>
                <span class="orderLiCon">{{ item.serviceRoom }}</span>
              </Col>
              <Col span="8">
                <span class="orderLititle">是否售前：</span>
                <span class="orderLiCon">{{ item.preSale==0? '否':'是' }}</span>
              </Col>
            </Row>
          </div>
          <div>
            <div class="orderLititle">项目名称：</div>
            <div class="orderLiCon" v-for="(it,i) in item.project">
              {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
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
          <div class="prtotle">合计：<span class="price" style="font-size: 16px">￥{{ item.cashAmount }}</span></div>
          <div  style="width: 25%;margin: 0 auto">
            <Button  class="hy_btn" @click="settlement">结算</Button>
            <Button type="ghost" @click="edit(i)">编辑</Button>
          </div>
        </div>
      </Col>
    </Row>

    <Modal  v-model="service" :title="serCard" @on-ok="ok"  >
      <Checkbox v-model="orderINfo.isAnonymous"  :disabled="serCard=='修改服务单'?true:false">匿名服务单</Checkbox>
      <br/>
      <br/>
      <span>用户选择：</span>
      <Select v-model="orderINfo.customerId" filterable style="width:200px" :disabled="serCard=='修改服务单'?true:false">
        <Option v-for="item in u_list" :value="item.id" :key="item.id">{{ item.realName }}</Option>
      </Select>
      <br/>
      <br/>
      <span>技师选择：</span>
      <Select v-model="orderINfo.operatorId" filterable style="width:200px">
        <Option v-for="item in e_list" :value="item.id" :key="item.id">{{ item.realName }}</Option>
      </Select>
      <br/>
      <br/>
      <span>是否指定：</span>
      <Select v-model="orderINfo.appoint" style="width:200px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
      <br/>
      <br/>
      <span>是否售前：</span>
      <Select v-model="orderINfo.preSale" style="width:200px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
      <br/>
      <br/>
      <span>房间选择：</span>
      <Select v-model="orderINfo.roomId" style="width:200px">
        <Option v-for="item in r_list" :value="item.label" :key="item.label">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>服务时间：</span>
      <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" v-model="orderINfo.serviceDate"></DatePicker>
      <br/>
      <br/>
      <span v-if="serCard!='修改服务单'">项目选择：</span>
      <span v-if="serCard=='修改服务单'">增加项目：</span>
      <Select v-model="orderINfo.project" multiple>
        <Option v-for="item in p_list" :value="item.id" :key="item.id">
          <span>{{ item.projectName }}</span>
          <span style="float:right;color:#ccc">￥{{ item.courseMoney }}</span>
        </Option>
      </Select>
      <br/>
      <br/>
      <div v-if="serCard=='修改服务单'">已选项目：
        <span v-for="item in p_list">{{ item.projectName }} <span class="price" >￥{{ item.money }}</span>&nbsp;&nbsp;</span>
      </div>
      <br/>
    </Modal>

    <Modal  v-model="settlementF" title="结算" @on-ok="sok">
      <div>您正在结算服务单，点击确认后将打印单据，请保持打印机连接畅通</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_list, ser_save} from '../../interface';

  export default {
    name: 'ser_indexForS',
    created() {
      this.getList(1);
      this.GetData('u_Alllist',this, this.setData);
      this.GetData('e_Alllist',this, this.setData);
      this.GetData('p_Alllist',this, this.setData);
      this.GetData('s_AllList',this, this.setData);
    },
    data() {
      return {
        serCard: '创建服务单',
        serser: '',
        service: false,
        settlementF: false,
        orderINfo: {
          isAnonymous: false, //匿名
          customerId: '',
          operatorId: '',  //技师
          appoint: '',
          roomId: '',
          orderType: '2',
          project: [],
          serviceDate: '',
          preSale: '',
        },
        u_list: [],
        e_list: [],
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
        p_list: [],
        pr_list: [],
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
        ],
      }
    },
    methods: {
      setData(data, type) {
        if(type == 'u_Alllist'){
          this.u_list = data;
        }
        if(type == 'e_Alllist'){
          this.e_list = data;
        }
        if(type == 'p_Alllist'){
          this.p_list = data;
        }
        if(type == 's_AllList'){
          this.pr_list = data;
        }
      },
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
        this.orderINfo.serviceDate = new Date(this.orderINfo.serviceDate).Format('yyyy-MM-dd')
        for (let variable in this.orderINfo) {
          if (this.orderINfo[variable] === '' || this.orderINfo[variable] === null) {
            this.$Message.warning('请完整填写服务单');
            return false
          }
        }
        let data = [];
        for (let it in this.orderINfo.project) {
          data = [...data,{projectId: this.orderINfo.project[it]} ]
        }
        this.orderINfo.project = data;
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.orderINfo,
          contentType: 'application/json;charset=UTF-8',
          url: ser_save(),
        }).then((res) => {
          this.$Message.success('操作成功');
        }).catch((error) => {
        });
      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户名字');
        }
      },
      newEm() {
        this.serCard = '新建服务单';
        this.service = true;
      },
      edit(i) {
        this.serCard = '修改服务单';
        this.service = true;
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
