<template>
    <div>
      <Row :gutter="24" class="">
        <Col span="4">
        <Input v-model="name" placeholder="商品名" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="newEm">新增入库</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="repot">入库记录</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="repot">出库记录</Button>
        </Col>
      </Row>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Page :current="2" :total="50" simple class="center"></Page>

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
        <DatePicker type="date" v-model="p_endDate" placeholder="选择日期" style="width: 200px"></DatePicker>
      </Modal>

      <Modal  v-model="moveF" title="入库小库" @on-ok="movers">
        <Input v-model="m_name" disabled>
        <span slot="prepend">商品名称</span>
        </Input>
        <br/>
        <Input v-model="m_number">
        <span slot="prepend">商品数量</span>
        </Input>
        <br/>
        <div>大库剩余数量：{{p_number}}</div>
        <br/>
      </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 's_big',
      data () {
        return {
          m_id:'',
          m_name:'',
          m_number:'',
          name: '',
          p_name: '',
          p_number: '',
          p_sp: '',
          p_endDate: '',
          moveF: false,
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
            {
              title: '操作',
              key: 'move',
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
                        this.move(params)
                      }
                    }
                  }, '转入小库'),
                ]);
              }
            },
          ],
          data: [
            {
              p_name: '宝宝霜',
              p_enterDate: '2012-12-12',
              p_afterDate: '2016-12-12',
              p_number: '39',
              c_sp: '阿拉伯半岛',
              id: 1,
            },
          ],
        }
      },
      created() {
      },
      methods: {
        newEm() {
          this.emac = true;
          this.p_name = '';
          this.p_number = '';
          this.p_sp = '';
          this.p_endDate = '';
        },
        move(r) {
          this.moveF = true;
          this.m_name = r.row.p_name;
          this.m_id = r.row.id;
          this.m_number = '';
          this.p_number = r.row.p_number;
        },
        movers() {
          if(this.m_number == ''){
            this.$Message.warning('请输入数量');
            return false;
          }
          if(Number(this.p_number) < Number(this.m_number)){
            this.$Message.error('大库商品不足');
            return false;
          }
        },
        ok() {   //

        },
        repot() {   //

        },
        serc() {    //搜索
          if (this.name == '') {
            this.$Message.warning('请输入名称');
          }
        },
      },
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
  .center{
    margin: 10px auto;
    text-align: center;
  }

</style>
