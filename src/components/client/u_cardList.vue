<template>
  <div style="padding: 2px">
    <Button type="info" @click="newqu">新增卡</Button>
    <br/>
    <br/>
    <Table :columns="cards" :data="cardsData" :row-class-name="rowClassName"></Table>
    <Page :current="2" :total="50" simple class="center"></Page>
    <Modal v-model="newCardF" title="新增卡">
      <div>请选择新增类型</div>
      <RadioGroup v-model="radio">
        <Radio label="1">产品卡</Radio>
        <Radio label="2">体验卡</Radio>
        <Radio label="3">拓客卡</Radio>
        <Radio label="4">疗程卡</Radio>
        <Radio label="5">组合疗程卡</Radio>
      </RadioGroup>
    </Modal>
    <Modal v-model="opF" title="卡操作">
      <RadioGroup v-model="optortion">
        <Radio label="1">续费</Radio>
        <Radio label="2">其他</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_cardList} from '../../interface';

  export default {
    name: 'u_cardList',
    data(){
      return {
        newCardF: false,
        opF: false,
        radio: 1,
        optortion: 1,
        cards: [
          {key: 'date', title: '购卡日期'},
          {key: 'endDate', title: '过期日期'},
          {key: 'type', title: '卡类'},
          {key: 'times', title: '剩余次数'},
          {key: 'status', title: '状态', render: (h, p)=>{if(p.row.status == 1){return '正常'}else if(p.row.status == 0){return '禁用'}else if(p.row.status == 2){return '过期'}}},
          {key: 'other', title: '备注'},
          {key: 'money', title: '现金券'},
          {key: 'gift', title: '赠送项目'},
          {key: 'action', title: '操作',render: (h, params) => {
            return h('div', [
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
                    if(params.row.times == 0){
                      this.$Message.warning('该卡次数已经用尽，不能退卡');
                      return false;
                    }
                    if(params.row.status == 2){
                      this.$Message.warning('该卡已过期，不能退卡');
                      return false;
                    }
                    this.tuika(params.index)
                  }
                }
              }, '退卡'),
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
                    this.datile(params.index)
                  }
                }
              }, '操作'),
            ]);
          }},
        ],
        cardsData: [
          {date: '2012-12-12', endDate: '2017-12-12', type: '产品卡', times: 21, status: 1, other: '无', money: 200, gift: '美白2次'},
          {date: '2012-12-12', endDate: '2017-12-12', type: '产品卡', times: 0, status: 1, other: '无', money: 200, gift: '耗尽'},
          {date: '2012-12-12', endDate: '2017-12-12', type: '产品卡', times: 12, status: 0, other: '无', money: 200, gift: '美白1次'},
          {date: '2012-12-12', endDate: '2013-12-12', type: '产品卡', times: 12, status: 2, other: '无', money: 20, gift: '耗尽'},
        ],
      }
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getList(1,  this.userID);
    },
    methods: {
      getList(page, uid) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_cardList() + '?id=' + uid +"&page="+page+"&pageSize=50",
        }).then((res) => {
          this.serviceData = res.data.results;
        }).catch((error) => {
        });
      },
      newqu() {
        this.newCardF = true;
      },
      datile() {
        this.opF = true;
      },
      tuika() {
        var r=confirm("您确定退卡？")
        if(r) {
          this.$Message.success('退卡成功');
        }
      },
      rowClassName(r) {
        if(r.times <= 0) {
          return 'timesOver';
        }
        if(r.status == 0) {
          return 'noActive';
        }
        if(new Date(Date.parse(r.endDate)) < new Date()) {
          return 'over';
        }
      },
    },
  };
</script>

<style>
  .ivu-table .timesOver td{
    background-color: #fff4f3;
  }
  .ivu-table .noActive td{
    background-color: #f3e8e7;
  }
  .ivu-table .over td{
    background-color: #eee;
  }
  .center{
    margin: 10px auto;
    text-align: center;
  }
</style>
