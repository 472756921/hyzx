<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="商品名 / 时间" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新增入库</Button>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="">盘点</Button>
      </Col>
    </Row>

    <div class="title">上一次盘点情况</div>

    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" title="新增入库" @on-ok="ok"  >
      <Input v-model="p_name">
        <span slot="prepend">商品名称</span>
      </Input>
      <br/>
      <Input v-model="p_number">
        <span slot="prepend">商品数量</span>
      </Input>
      <br/>
      <Input v-model="p_sp">
        <span slot="prepend">商品来源</span>
      </Input>
      <br/>
      <span>过期时间：</span>
      <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 's_index',
    data () {
      return {
        name: '',
        emac: false,
        columns: [
          {
            title: '货品名',
            key: 'p_name',
          },
          {
            title: '入库时间',
            key: 'p_enterDate'
          },
          {
            title: '过期时间',
            key: 'p_afterDate',
          },
          {
            title: '数量',
            key: 'p_number'
          },
          {
            title: '货品来源',
            key: 'c_sp',
          },
        ],
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        data: [
          {
            p_name: '宝宝霜',
            p_enterDate: '2012-12-12',
            p_afterDate: '2016-12-12',
            p_number: '39',
            c_sp: '阿拉伯半岛',
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
            label: '小黑'
          },
          {
            value: '2',
            label: '小白'
          },
        ],
      }
    },
    created() {
    },
    methods: {
      newEm() {
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
