<template>
  <div>
    <Table :columns="service" :data="serviceData"></Table>
    <Page :current="2" :total="50" simple class="center"></Page>
    <Modal v-model="model1" title="服务详情">
      <div>开始时间：{{startDate}}</div>
      <br/>
      <div>结束时间：{{endDate}}</div>
      <br/>
      <div>服务项目：{{model2}}</div>
      <br/>
      <div>服务房间：{{model3}}</div>
      <br/>
      <div>用户：{{model4}}</div>
      <br/>
      <div>技师：{{model5}}</div>
      <br/>
      <div>是否指定技师：{{isSet_e==1?'指定':'非指定'}}</div>
      <br/>
      <div>使用产品：{{model6}}</div>
      <br/>
      <div>总金额：{{model7}}</div>
      <br/>
      <div>是否卡扣：{{isCard==1?'是':'否'}}</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_serviceList',
    data(){
      return {
        startDate: '',
        endDate: '',
        model2: '',
        model3: '',
        model4: '',
        model5: '',
        model6: '',
        model7: '',
        isSet_e: 1,
        isCard: 1,
        model1: false,
        service: [
          {key: 'date', title: '日期'},
          {key: 'number', title: '服务单号'},
          {key: 'e_name', title: '技师'},
          {key: 'room', title: '房间'},
          {
            key: 'zd', title: '是否指定', render: (h, p)=> {
            if (p.zd == 1) {
              return '指定'
            } else {
              return '非指定'
            }
          }
          },
          {
            key: 'pay_way', title: '支付方式', render: (h, p)=> {
            if (p.pay_way == 1) {
              return '卡扣'
            } else {
              return '现金'
            }
          }
          },
          {
            title: '操作',
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
                    this.datile(params.row)
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
      }
    },
    methods: {
      datile(row) {
        this.startDate = '2012-12-12 9:00',
        this.endDate = '2012-12-12 12:00',
        this.model7 = 1750.00,
        this.model6 = '玫瑰精华护肤油，欧莱雅面霜',
        this.model5 = '李小璐',
        this.model4 = '刘德华',
        this.model3 = 302,
        this.model2 = '面部补水',
        this.model1 = true;
      },
    },
  };
</script>

<style scoped>
  .center{
    margin: 10px auto;
    text-align: center;
  }
</style>
