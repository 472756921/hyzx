<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="编号 / 名称" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建项目</Button>
      </Col>
    </Row>

    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" :title="emacs" @on-ok="ok"  >
      <Input v-model="p_name">
        <span slot="prepend">项目名称</span>
      </Input>
      <br/>
      <Input v-model="p_number">
        <span slot="prepend">项目类型</span>
      </Input>
      <br/>
      <Input v-model="p_time">
        <span slot="prepend">项目次数</span>
      </Input>
      <br/>
      <Input v-model="p_sp">
        <span slot="prepend">项目间隔</span>
      </Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'p_index',
    data () {
      return {
        name: '',
        emacs: '新增项目',
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
            title: '项目次数',
            key: 'p_time'
          },
          {
            title: '项目间隔',
            key: 'p_sp',
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
//                        this.edit(params.index, 1)
                      }
                    }
                  }, '详情'),
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
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
//                        this.option(params.index)
                      }
                    }
                  }, '删除')
                ]);
              }
          }
        ],
        p_name: '',
        p_number: '',
        p_type: '',
        p_time: '',
        p_sp: '',
        data: [
          {
            p_name: '宝宝霜',
            p_number: '34223419478',
            p_type: '面部项目',
            p_time: '2',
            p_sp: '2',
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
        this.p_type = '';
        this.p_time = '';
        this.p_sp = '';
      },
      edit(index) {
        this.emac = true;
        this.emacs = '修改项目';
        this.p_number = this.data[index].p_number;
        this.p_name = this.data[index].p_name;
        this.p_type = this.data[index].p_type;
        this.p_time = this.data[index].p_time;
        this.p_sp = this.data[index].p_sp;
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
