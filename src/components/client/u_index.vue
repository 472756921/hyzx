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
      <Input v-model="e_name" :disabled="emclass=='修改用户'?true:false" ><span slot="prepend">用户姓名</span></Input>
      <br/>
      <Input v-model="e_idNumber" :disabled="emclass=='修改用户'?true:false"><span slot="prepend">身份证号</span></Input>
      <br/>
      <Input v-model="e_phone"><span slot="prepend">电话号码</span></Input>
      <br/>
      <Input v-model="e_skit"><span slot="prepend">服务介绍</span></Input>
      <br/>
      <h3>类型选择</h3>
      <br/>
      <RadioGroup v-model="e_type" type="button">
        <Radio label="1">技师</Radio>
        <Radio label="2">按摩师</Radio>
      </RadioGroup>
      <br/>
      <br/>
      <RadioGroup v-model="e_group" type="button">
        <Radio label="1">第一组</Radio>
        <Radio label="2">第二组</Radio>
      </RadioGroup>
      <br/>
      <br/>
      <RadioGroup v-model="e_live" type="button">
        <Radio label="1">一级</Radio>
        <Radio label="2">二级</Radio>
        <Radio label="2">三级</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'u_index',
    data () {
      return {
        e_name: '',
        e_idNumber: '',
        e_phone: '',
        e_skit: '',
        e_group: '',
        e_live: '',
        e_type: '',
        emclass: '', //新增、修改员工 modal标题
        bkDate: '',
        bjDate: '',
        name: '',
        emac: false,
        bjClass: '',
        kqClass: '',
        columns: [
          {
            title: '姓名',
            key: 'e_name',
          },
          {
            title: '年龄',
            key: 'e_age'
          },
          {
            title: '性别',
            key: 'e_sex'
          },
          {
            title: '身份证号码',
            key: 'e_idNumber'
          },
          {
            title: '电话号码',
            key: 'e_phone'
          },
          {
            title: '等级',
            key: 'e_class'
          },
          {
            title: '有效卡',
            key: 'e_skit'
          },
          {
            title: '上次服务时间',
            key: 'e_joinDate'
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
            e_name: '小黑',
            e_age: 18,
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_class: '黄金会员',
            e_skit: '美白卡（即将到期），抽脂卡',
            e_joinDate: '2014-03-23',
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
        this.e_name = this.data[index].e_name;
        this.e_phone = this.data[index].e_phone;
        this.e_idNumber = this.data[index].e_idNumber;
        this.e_skit = this.data[index].e_skit;
        this.e_group = this.data[index].e_group;
        this.e_type = this.data[index].e_type;
        this.e_live = this.data[index].e_class;
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
