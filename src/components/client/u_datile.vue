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
      <TabPane label="消费记录(现金)" name="name2">
        <Table :columns="shop" :data="shopData" :row-class-name="rowClassName"></Table>
      </TabPane>
      <TabPane label="问题分析" name="name3">
        <Table :columns="question" :data="questionData"></Table>
      </TabPane>
      <TabPane label="现有卡情况" name="name4">
        <Table :columns="cards" :data="cardsData"></Table>
      </TabPane>
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
          {key: 'number', title: '服务单号'},
          {key: 'e_name', title: '技师'},
          {key: 'room', title: '房间'},
          {key: 'zd', title: '是否指定', render:(h, p)=>{if(p.zd==1){return '指定'}else{return '非指定'}}},
          {key: 'pay_way', title: '支付方式', render:(h, p)=>{if(p.pay_way==1){return '卡扣'}else{return '现金'}}},
          { title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [h('Button', {
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
                }, '详细'),
              ]);
            }
          },
        ],
        serviceData: [
          {date: '2012-12-12', e_name: '张小泉', zd: 1, pay_way: 1, room: 203, number: 123123},
        ],
        shop: [
          {key: 'date', title: '日期'},
          {key: 'price', title: '金额'},
          {key: 'status', title: '行为', render:(h, p)=>{if(p.row.status === 1){return '充值'}else if(p.row.status === 2 ){return '购买产品'} else if(p.row.status === 0 ) {return '退款'}}},
          {key: 'p_name', title: '产品'},
        ],
        shopData: [
          {date: '2012-12-12', status: 2, price: 12000, p_name: '梨花膏'},
          {date: '2012-12-12', status: 1, price: 12000, p_name: '储值卡'},
          {date: '2012-12-12', status: 0, price: 12000, p_name: '储值卡'},
        ],
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
      };
    },
    methods: {
      rowClassName(r) {
        if(r.status == 0){
          return 'redBack';
        }
      }
    },
  };
</script>

<style>
  .ivu-table .redBack td{
    background-color: #fff4f3;
  }
</style>
