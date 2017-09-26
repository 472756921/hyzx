<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="用户姓名" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建用户</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" :title="emclass" @on-ok="ok"  >
      <h3>基础信息</h3>
      <br/>
      <Input v-model="u_name" :disabled="emclass=='修改用户'?true:false" ><span slot="prepend">用户姓名</span></Input>
      <br/>
      <Input v-model="u_idNumber" :disabled="emclass=='修改用户'?true:false"><span slot="prepend">身份证号</span></Input>
      <br/>
      <Input v-model="u_phone"><span slot="prepend">电话号码</span></Input>
      <br/>
      <Input v-model="u_skit"><span slot="prepend">有效卡</span></Input>
      <br/>
      <RadioGroup v-model="u_live" type="button">
        <Radio label="1">普通会员</Radio>
        <Radio label="2">白银会员</Radio>
        <Radio label="3">黄金会员</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'u_index',
    data () {
      return {
        u_name: '',
        u_idNumber: '',
        u_phone: '',
        u_skit: '',
        u_group: '',
        u_live: '',
        u_type: '',
        emclass: '', //新增、修改员工 modal标题
        name: '',
        emac: false,
        columns: [
          {
            title: '姓名',
            key: 'u_name',
          },
          {
            title: '年龄',
            key: 'u_age'
          },
          {
            title: '性别',
            key: 'u_sex'
          },
          {
            title: '身份证号码',
            key: 'u_idNumber'
          },
          {
            title: '电话号码',
            key: 'u_phone'
          },
          {
            title: '等级',
            key: 'u_class'
          },
          {
            title: '有效卡',
            key: 'u_skit'
          },
          {
            title: '上次服务时间',
            key: 'u_joinDate'
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
                      this.daka(params.index)
                    }
                  }
                }, '创建服务单'),
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
                      this.biaoji(params.index)
                    }
                  }
                }, '开卡'),
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
                      this.edit(params.index)
                    }
                  }
                }, '修改资料'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '退卡'),
              ]);
            }
          }
        ],
        data: [
          {
            u_name: '小黑',
            u_age: 18,
            u_sex: '女',
            u_idNumber: 510203944839382766,
            u_phone: 17780039283,
            u_class: '黄金会员',
            u_skit: '美白卡（即将到期），抽脂卡',
            u_joinDate: '2014-03-23',
          },
        ],
        date: '',
      }
    },
    created() {
    },
    methods: {
      newEm() {
        this.emclass = '新增用户';
        this.emac = true;
      },
      edit(index) {
        this.u_name = this.data[index].u_name;
        this.u_phone = this.data[index].u_phone;
        this.u_idNumber = this.data[index].u_idNumber;
        this.u_skit = this.data[index].u_skit;
        this.u_group = this.data[index].u_group;
        this.u_type = this.data[index].u_type;
        this.u_live = this.data[index].u_class;
        this.emclass = '修改用户';
        this.emac = true;
      },
      ok() {   //

      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户名字');
        }
      },
      remove (index) {
        this.data6.splice(index, 1);
      }
    }
  };
</script>

<style scoped>
  .herf_a{
    font-size: 14px;
    line-height: 32px;
    color: #66368C;
    cursor: pointer;
  }
  .serc{
    cursor: pointer;
  }
</style>
