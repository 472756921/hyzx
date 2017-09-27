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
    <Modal  v-model="service" title="创建服务单" @on-ok="ok"  >
      <Checkbox v-model="single">匿名服务单</Checkbox>
      <br/>
      <br/>
      <div>用户姓名：{{u_name}}</div>
      <br/>
      <span>技师选择：</span>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>售前选择：</span>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>售后选择：</span>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>房间选择：</span>
      <Select v-model="model2" style="width:200px">
        <Option v-for="item in r_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>服务时间：</span>
      <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" v-model="serviceDate"></DatePicker>
      <br/>
      <br/>
      <span>项目选择：</span>
      <Select v-model="model3" multiple>
        <Option v-for="item in p_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
      <br/>
      <br/>
      <span>产品选择：</span>
      <Select v-model="model4" multiple>
        <Option v-for="item in pr_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
    </Modal>
    <Modal  v-model="openCard" :title="cards" @on-ok="ok"  >
      <Select v-model="model5" style="width:200px">
        <Option v-for="item in card_list" :value="item.value" :key="item.value">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">￥{{ item.price }}</span>
        </Option>
      </Select>
      <br/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'u_index',
    data () {
      return {
        u_name: '',
        cards: '用户开卡',
        single: false,
        u_idNumber: '',
        u_phone: '',
        u_skit: '',
        serviceDate: '',
        u_group: '',
        u_live: '',
        u_type: '',
        emclass: '', //新增、修改员工 modal标题
        name: '',
        emac: false,
        openCard: false,
        service: false,
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
            key: 'u_class',
            render: (h, params) => {
              if(params.row.u_class == 1){
                return ("普通会员");
              }
              if(params.row.u_class == 2){
                return ("白银会员");
              }
              if(params.row.u_class == 3){
                return ("黄金会员");
              }
            }
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
                      this.createService(params.index)
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
                      this.card(params.index, 1)
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
                      this.card(params.index, 2)
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
            u_class: '2',
            u_skit: '美白卡（即将到期），抽脂卡',
            u_joinDate: '2014-03-23',
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
        r_list: [
          {
            value: '302',
            label: '302'
          },
          {
            value: '303',
            label: '303'
          },
        ],
        p_list: [
          {
            value: '1',
            price: '1200.00',
            label: '美体',
          },
          {
            value: '2',
            price: '1100.00',
            label: '嫩肤',
          },
        ],
        pr_list: [
          {
            value: '1',
            price: '10.00',
            label: '宝宝霜',
          },
          {
            value: '2',
            price: '30.00',
            label: '霸王洗发露',
          },
        ],
        card_list: [
          {
            value: '1',
            price: '10.00',
            label: '美肤卡',
          },
          {
            value: '2',
            price: '30.00',
            label: '洗头卡',
          },
        ],
        model1: '',
        model2: '',
        model5: '',
        model3: [],
        model4: [],
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
      },
      createService (index) {
        this.u_name = this.data[index].u_name;
        this.service = true;
      },
      card (index, type){
        if (type === 1) {
          this.cards = '用户开卡';
        } else if (type == 2) {
          this.cards = '用户退卡';
          this.card_list =  [
            {
              value: '1',
              price: '10.00',
              label: '美白卡',
            },
            {
              value: '2',
              price: '30.00',
              label: '抽脂卡',
            },
          ]
        }
        this.openCard = true;
      },
    }
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
</style>
