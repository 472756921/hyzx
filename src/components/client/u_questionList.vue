<template>
  <div>
    <Table :columns="question" :data="questionData"></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_questionList',
    data(){
      return {
        question: [
          {key: 'date', title: '添加日期'},
          {key: 'question', title: '问题描述'},
          {key: 'resti', title: '决绝方案',  render:(h, p)=>{if(p.row.resti === 1){return '基础方案'}else if(p.row.resti === 2 ){return '推荐方案'} else if(p.row.resti === 3 ) {return '最优方案'}else if(p.row.resti === 0 ) {return '未指定'}}},
          {key: 'action', title: '操作', render: (h, params) => {
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
              }, '解决方案'),
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
        questionData: [
          {date: '2012-12-12', question: '皮肤暗沉', resti: 1},
          {date: '2012-12-12', question: '眼部皮肤松弛', resti: 2},
          {date: '2012-12-12', question: '眼袋', resti: 3},
          {date: '2012-12-12', question: '黄褐斑', resti: 0},
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
