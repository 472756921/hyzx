<template>
  <div>
    <Table :columns="cards" :data="cardsData"></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_cardList',
    data(){
      return {
        cards: [
          {key: 'date', title: '购卡日期'},
          {key: 'type', title: '卡类'},
          {key: 'times', title: '剩余次数'},
          {key: 'status', title: '状态'},
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
          {date: '2012-12-12', type: '产品卡', times: '22', status: 1, other: '无'},
        ],
      }
    },
    methods: {
    },
  };
</script>

<style>
  .ivu-table .redBack td{
    background-color: #fff4f3;
  }
</style>
