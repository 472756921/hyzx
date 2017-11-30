<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="编号 / 名称" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
    </Row>

    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" title="项目信息" @on-ok="ok"  >
      <div>项目编号：{{index.p_number}}</div>
      <br/>
      <div>项目名称：{{index.p_name}}</div>
      <br/>
      <div>项目类型：{{index.p_type}}</div>
      <br/>
      <div>单次价格：{{index.p_price}}</div>
      <br/>
      <div>疗程价格：{{index.p_Lprice}}</div>
      <br/>
      <div>卡扣疗程价格：{{index.p_CLprice}}</div>
      <br/>
      <div>体验价格：{{index.p_ETprice}}</div>
      <br/>
      <div>功效：{{index.p_effect==1?'强':'弱'}}</div>
      <br/>
      <div>备注：{{index.p_other}}</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import {p_list} from '../../interface';
  export default {
    name: 'p_index',
    data () {
      return {
        name: '',
        index: '',
        emac: false,
        columns: [
          {
            title: '项目编号',
            key: 'p_number',
          },
          {
            title: '项目名称',
            key: 'p_name'
          },
          {
            title: '项目类型',
            key: 'p_type',
          },
          {
            title: '功效',
            key: 'p_effect',
            render: (h, p) => {
              if(p.row.p_effect == 0) {
                return '弱';
              }
              if(p.row.p_effect == 1) {
                return '强';
              }
            },
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
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
                      this.edit(params.index, 1)
                    }
                  }
                }, '详情'),
              ]);
            }
          }
        ],
        data: [
          {
            p_name: '宝宝霜',
            p_number: '34223419478',
            p_type: '面部项目',
            p_price: 220,
            p_Lprice: 210,
            p_CLprice: 200,
            p_ETprice: 210,
            p_effect: 0,
            p_other: '备注信息备注信息备注信息备注信息',
          },
        ],
      }
    },
    created() {
      this.getList(1);
    },
    methods: {
      edit(index) {
        this.emac = true;
        this.index = this.data[index];
      },
      ok() {   //

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
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: p_list() + '?page='+page+'&pageSize=50',
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
    }
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .title{
    font-size: 18px;
    margin: 14px 0;
    color: #66368C;
  }
</style>
