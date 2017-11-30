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
          <Button class="hy_btn" @click="getList(1)">盘点库存</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="inStock(1)">入库记录</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="outStock(1)">出库记录</Button>
        </Col>
      </Row>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Page :current="1" :total="50" simple class="center"></Page>

      <Modal  v-model="emac" title="新增入库" @on-ok="saveE">
        <Input v-model="stock.name">
        <span slot="prepend">商品名称</span>
        </Input>
        <br/>
        <Input v-model="stock.quantity">
        <span slot="prepend">商品数量</span>
        </Input>
        <br/>
        <Input v-model="stock.source">
        <span slot="prepend">商品来源</span>
        </Input>
        <br/>
        <span>过期时间：</span>
        <DatePicker type="date" v-model="stock.expiration" placeholder="选择日期" style="width: 200px"></DatePicker>
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
  import { s_List, s_inStock, s_save, s_outStock } from '../../interface';

    export default {
      name: 's_big',
      data () {
        return {
          type: 1,
          stock: {
            name: '',
            quantity: '',
            source: '',
            expiration: '',
          },
          p_number: '',
          m_id:'',
          m_name:'',
          m_number:'',
          name: '',
          moveF: false,
          emac: false,
          columns: [
            {
              title: '货品名',
              key: 'name',
            },
            {
              title: '入库时间',
              key: 'storage'
            },
            {
              title: '过期时间',
              key: 'expiration',
            },
            {
              title: '数量',
              key: 'actualQuantity'
            },
            {
              title: '货品来源',
              key: 'source',
            },
            {
              title: '操作',
              key: 'move',
              render: (h, params) => {
                if(this.type === 1){
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
              }
            },
          ],
          data: [],
        }
      },
      created() {
        this.getList(1,1);
      },
      methods: {
        getList(page, type) {
          let url = '';
          this.type = type;
          if(type === 1) {
            url = s_List() + '?page='+page+'&pageSize=30';
          }
          if(type === 2) {
            url = s_List() + '?page='+page+'&pageSize=30';
          }
          if(type === 3) {
            url = s_List() + '?page='+page+'&pageSize=30';
          }
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: {},
            contentType: 'application/json;charset=UTF-8',
            url: url ,
          }).then((res) => {
            this.data = res.data.results;
          }).catch((error) => {
          });
        },
        newEm() {
          this.emac = true;
          this.stockclear();
        },
        stockclear(){
          this.stock = {
            name: '',
            quantity: '',
            source: '',
            expiration: '',
          };
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
        saveE() {
          this.stock.expiration = new Date(this.stock.expiration).Format('yyyy-MM-dd')
          this.stock.actualQuantity = 1;
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            data: this.stock,
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: s_save(),
          }).then((res) => {
            this.$Message.success('操作成功')
          }).catch((error) => {
          });
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
