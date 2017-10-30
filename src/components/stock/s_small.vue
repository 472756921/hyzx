<template>
    <div>
      <Row :gutter="24" class="">
        <Col span="4">
        <Input v-model="name" placeholder="商品名" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
        </Col>
        <Col span="2">
         <Button class="hy_btn" @click="repot">入库记录</Button>
        </Col>
        <Col span="2">
        <Button class="hy_btn" @click="repot">消耗记录</Button>
        </Col>
      </Row>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Page :current="2" :total="50" simple class="center"></Page>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 's_small',
      data () {
        return {
          name: '',
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
                  }, '耗尽'),
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
        serc() {    //搜索
          if (this.name == '') {
            this.$Message.warning('请输入名称');
          }
        },
        repot() {

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
