<template>
  <div>
    <Table :columns="service" :data="serviceData"></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_shopList',
    data(){
      return {
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
      }
    },
  };
</script>

<style scoped>

</style>
