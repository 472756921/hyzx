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

    <Modal  v-model="emac" :title="emclass" @on-ok="saveUser"  >
      <h3>基础信息</h3>
      <br/>
      <Input v-model="user.realName" :disabled="emclass=='修改用户'?true:false" ><span slot="prepend">用户姓名</span></Input>
      <br/>
      <Input v-model="user.idCardNumber" :disabled="emclass=='修改用户'?true:false"><span slot="prepend">身份证号</span></Input>
      <br/>
      <Input v-model="user.phoneNumber"><span slot="prepend">电话号码</span></Input>
      <br/>
      <span>推荐人：</span>
      <Select v-model="user.introducerId" filterable style="width:200px" :disabled="emclass=='修改用户'?true:false">
        <!--<Option v-for="item in u_list" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      </Select>
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
  import { u_list, u_new, u_edit } from '../../interface';
  import IdentityCodeValid from '../ut/IDNumberCheck';

  export default {
    name: 'u_index',
    data () {
      return {
        u_name: '',
        cards: '用户开卡',
        single: false,
        serviceDate: '',
        emclass: '', //新增、修改员工 modal标题
        name: '',
        emac: false,
        openCard: false,
        service: false,
        user: {
          id: '',
          realName: '',
          idCardNumber: '',
          phoneNumber: '',
          gender: '',
          birthday: '',
          level: '',
          integral: '',
          introducer: '暂无',
          introducerId: '5',
          storeName: '',
          storeId: '',
          registrationTime: '',
          money: '',
          createPerson: '',
          createId: ''
        },
        columns: [
          {
            title: '姓名',
            key: 'realName',
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '性别',
            key: 'gender'
          },
          {
            title: '电话号码',
            key: 'phoneNumber'
          },
          {
            title: '等级',
            key: 'level',
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
//                h('Button', {
//                  props: {
//                    type: 'success',
//                    size: 'small'
//                  },
//                  style: {
//                    marginRight: '5px'
//                  },
//                  on: {
//                    click: () => {
//                      this.createService(params.index)
//                    }
//                  }
//                }, '创建服务单'),
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
                      this.datile(params.index)
                    }
                  }
                }, '详细'),
                h('Button', {
                  props: {
                    type: 'warning',
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
                }, '修改电话'),
              ]);
            }
          }
        ],
        data: [],
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
      this.getList(1);
    },
    methods: {
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: u_list() + '?page='+page+'&pageSize=30',
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      saveUser() {
        if(this.user.realName == '' || this.user.idCardNumber == '' || this.user.phoneNumber == '' || this.user.introducer == '') {
          this.$Message.warning('请填写用户信息');
          return ;
        }
        let url = u_new();
        if (this.emclass == '修改用户') {
          url = u_edit();
        } else {
          let d = IdentityCodeValid(this.user.idCardNumber);
          if (!d.passes){
            this.$Message.error(d.tips);
            return
          }
          this.user.sex = d.sex;
          this.user.birthday = d.brithday;
        }
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          data: this.user,
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: url,
        }).then((res) => {
          this.$Message.success('操作成功')
        }).catch((error) => {
        });
      },
      newEm() {
        this.emclass = '新增用户';
        this.emac = true;
        this.clearUser();
      },
      edit(index) {
        this.emclass = '修改用户';
        this.emac = true;
        this.clearUser();
        this.user =  this.data[index];
      },
      datile(index) {
        this.$router.push({path:'u_datile/'+this.data[index].id});
      },
      ok() {   //

      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户名字');
          return
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: u_list() + '?page=1&pageSize=50&name='+this.name,
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
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
      clearUser(){
        this.user =  {
          id: '',
          realName: '',
          idCardNumber: '',
          phoneNumber: '',
          gender: '',
          birthday: '',
          level: '',
          integral: '',
          introducer: '暂无',
          introducerId: '5',
          storeName: '',
          storeId: '',
          registrationTime: '',
          money: '',
          createPerson: '',
          createId: ''
        };
      },
    }
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
</style>
