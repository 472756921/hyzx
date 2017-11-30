<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="投诉人 / 被投诉人" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建投诉</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" :title="emclass" @on-ok="ok"  >
      <span>用户选择：</span>
      <Select v-model="model1" filterable style="width:200px" :disabled="emclass!='新建投诉'?true:false">
        <Option v-for="order in u_list" :value="order.value" :key="order.value">{{ order.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>服务单选择：</span>
      <Select v-model="model2" filterable style="width:200px" :disabled="emclass!='新建投诉'?true:false" @on-change="showOrder">
        <Option v-for="order in e_list" :value="order.value" :key="order.value">{{ order.label }}</Option>
      </Select>
      <div v-if="orderF" class="order">
        <div>
          <div>
              <span class="orderTitle">
                <span>{{ order.orderClass==1?'服务单':'匿名服务单' }}</span>
                <span class="orderNumber">（单号：39838213478）</span>
              </span>
            <span class="orderDate">{{ order.date }}</span>
          </div>
          <Row :gutter="10">
            <Col  span="8">
            <span class="orderLititle">顾客姓名：</span>
            <span class="orderLiCon">{{ order.u_name }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">顾客电话：</span>
            <span class="orderLiCon">{{ order.phone }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">顾客等级：</span>
            <span class="orderLiCon">{{ order.live==0?'非会员':order.live==1?'普通会员':order.live==2?'白银会员':'黄金会员' }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">服务技师：</span>
            <span class="orderLiCon">{{ order.servicer }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">指定：</span>
            <span class="orderLiCon">{{ order.servicerIS==1?"是":"否" }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">服务房间：</span>
            <span class="orderLiCon">{{ order.room }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">售前：</span>
            <span class="orderLiCon">{{ order.per_sale }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">售后：</span>
            <span class="orderLiCon">{{ order.aft_sale}}</span>
            </Col>
          </Row>
        </div>
        <div>
          <span class="orderLititle">项目名称：</span>
          <span class="orderLiCon" v-for="(it,i) in order.p_name"> {{ it.label }} &nbsp;<span class="price">￥{{ it.price }}</span> &nbsp;&nbsp;</span>
        </div>
        <div>
          <span class="orderLititle">产品名称：</span>
          <span class="orderLiCon" v-for="(it,i) in order.pr_list">霸王洗发露 <span class="orderNumber">X {{ it.number }}</span> &nbsp; <span class="price">￥3{{ it.price }}</span>&nbsp;&nbsp;</span>
        </div>
        <div class="prtotle">合计：<span class="price" style="font-size: 16px">￥{{ order.totle }}</span></div>
      </div>
      <br/>
      <br/>
      <span>投诉内容</span>
      <Input v-model="model3" type="textarea" :autosize="{minRows: 3,maxRows: 6}"  :readonly="emclass!='新建投诉'?true:false" placeholder="请输入投诉内容..."></Input>
      <br/>
      <br/>
      <span v-if="emclass=='投诉详情'">解决方案</span>
      <Input v-if="emclass!='新建投诉'" v-model="model4" type="textarea" :autosize="{minRows: 3,maxRows: 6}"  :readonly="emclass=='投诉详情'?true:false" placeholder="请输入投诉内容..."></Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { c_list, c_save } from '../../interface';

  export default {
    name: 'c_index',
    data () {
      return {
        order: {
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
          p_name: [
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
          per_id: '1',
          aft_id: '1',
          pr_list: [
            {
              value: '1',
              price: '10.00',
              number: '2',
              label: '宝宝霜',
            },
            {
              value: '2',
              number: '3',
              price: '30.00',
              label: '霸王洗发露',
            },
          ],
          totle: '300.00',
        },
        u_name: '',
        emclass: '',
        name: '',
        emac: false,
        orderF: false,
        columns: [
          {
            title: '投诉顾客',
            key: 'u_name',
          },
          {
            title: '被投诉人',
            key: 'e_name'
          },
          {
            title: '投诉问题',
            key: 'c_question',
            width: 300,
          },
          {
            title: '投诉时间',
            key: 'c_date'
          },
          {
            title: '状态',
            key: 'c_status',
            render: (h, params) => {
              if(params.row.c_status == 1){
                return ("已处理");
              }
              if(params.row.c_status == 0){
                return ("未处理");
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              if(params.row.c_status == 0){
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.option(params.index)
                      }
                    }
                  }, '处理'),
                ]);
              } else {
                return h('div',[
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.edit(params.index, 1)
                      }
                    }
                  }, '详情'),
                ])
              }
            }
          }
        ],
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        data: [
          {
            u_name: '小黑',
            u_id: '1',
            e_name: '刘德华',
            e_id: '1',
            c_question: '态度恶劣，把我的脸都弄花了，非常不情愿服务，总之给我的体验非常不爽',
            c_re: '扣除当月奖金，罚款300.00',
            u_joinDate: '2014-03-23',
            c_status: '1',
            c_date: '2012-12-12',
          },
          {
            u_name: '小黑',
            u_id: '1',
            e_name: '刘德华',
            e_id: '1',
            c_question: '态度恶劣，把我的脸都弄花了，非常不情愿服务，总之给我的体验非常不爽',
            u_joinDate: '2014-03-23',
            c_status: '0',
            c_date: '2012-12-11',
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
        e_list: [
          {
            value: '1',
            label: '2012-12-12'
          },
          {
            value: '2',
            label: '2012-12-12'
          },
        ],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: {},
          contentType: 'application/json;charset=UTF-8',
          url: c_list() + '?page=1&pageSize=30',
        }).then((res) => {
        }).catch((error) => {
        });
      },
      showOrder(){
        this.orderF=true;
      },
      newEm() {
        this.emclass = '新建投诉';
        this.orderF=false;
        this.emac = true;
        this.model1 = '';
        this.model2 = '';
        this.model3 = '';
      },
      edit(index) {
        this.emac = true;
        this.model1 = this.data[index].u_id;
        this.model2 = this.data[index].e_id;
        this.model3 = this.data[index].c_question;
        this.model4 = this.data[index].c_re;
        this.emclass = '投诉详情';
      },
      ok() {
        if(this.emclass != '新建投诉'){
          return ;
        }
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          data: this.user,
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: url,
        }).then((res) => {
          this.$Message.success('操作成功')
        }).catch((error) => {
        });
      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户或技师名字');
        }
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      option (index) {
        this.emac = true;
        this.model1 = this.data[index].u_id;
        this.model2 = this.data[index].e_id;
        this.model3 = this.data[index].c_question;
        this.model4 =  '',
        this.emclass = '投诉处理';
      },
    }
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .order{
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 20px 20px!important;
  }
</style>
