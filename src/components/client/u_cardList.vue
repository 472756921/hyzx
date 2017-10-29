<template>
  <div>
    <Button type="info" @click="newqu">新增卡</Button>
    <br/>
    <br/>
    <Table :columns="cards" :data="cardsData"></Table>

    <Modal v-model="newCardF" title="完成疗程">
      <div>请选择新增类型</div>
      <RadioGroup v-model="radio">
        <Radio label="1">产品卡</Radio>
        <Radio label="2">体验卡</Radio>
        <Radio label="3">拓客卡</Radio>
        <Radio label="4">疗程卡</Radio>
        <Radio label="5">组合疗程卡</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_cardList',
    data(){
      return {
        newCardF: false,
        radio: 1,
        cards: [
          {key: 'date', title: '购卡日期'},
          {key: 'type', title: '卡类'},
          {key: 'times', title: '剩余次数'},
          {key: 'status', title: '状态', render: (h, p)=>{if(p.row.status == 1){return '正常'}else if(p.row.status == 0){return '禁用'}}},
          {key: 'other', title: '备注'},
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
                    this.datile(params.index)
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
          {date: '2012-12-12', type: '产品卡', times: 21, status: 1, other: '无'},
          {date: '2012-12-12', type: '产品卡', times: 0, status: 1, other: '无'},
          {date: '2012-12-12', type: '产品卡', times: 12, status: 0, other: '无'},
        ],
      }
    },
    methods: {
      newqu() {
        this.newCardF = true;
      },
    },
  };
</script>

<style>
  .ivu-table .redBack td{
    background-color: #fff4f3;
  }
</style>
