<template>
  <div>
    <Table :columns="shop" :data="shopData" :row-class-name="rowClassName"></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_shopList',
    data(){
      return {
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
      }
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
