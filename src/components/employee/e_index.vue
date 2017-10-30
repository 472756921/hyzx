<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="员工姓名" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新增员工</Button>
      </Col>
      <Col span="2"  push="16">
        <span class="herf_a" @click="lizhi">离职员工</span>
      </Col>
    </Row>
    <Table :columns="columns" :data="data" :row-class-name="rowClassName"></Table>

    <Modal  v-model="modal1" title="考勤打卡" @on-ok="ok"  >
      <div>现在时间：{{date}}</div>
      <br/>
      <RadioGroup v-model="kqClass" type="button">
        <Radio label="1">上班</Radio>
        <Radio label="2">下班</Radio>
        <Radio label="3">上班补卡</Radio>
        <Radio label="4">下班补卡</Radio>
      </RadioGroup>
      <br/>
      <DatePicker v-if="kqClass==3||kqClass==4" type="date" placeholder="选择日期" style="width: 200px;margin-top:20px" :value="bkDate"></DatePicker>
    </Modal>
    <Modal  v-model="modal2" title="事件标记" @on-ok="ok"  >
      <div>{{date}}</div>
      <br/>
      <RadioGroup v-model="bjClass" type="button">
        <Radio label="1">事假</Radio>
        <Radio label="2">病假</Radio>
        <Radio label="3">出差</Radio>
        <Radio label="4">调休</Radio>
        <Radio label="5">离职</Radio>
      </RadioGroup>
      <br/>
      <DatePicker v-if="bjClass!=5" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin-top:20px" :value="bjDate"></DatePicker>
    </Modal>
    <Modal  v-model="emac" :title="emclass" @on-ok="ok"  >
      <h3>基础信息</h3>
      <br/>
      <Input v-model="e_name" :disabled="emclass=='修改员工'?true:false" ><span slot="prepend">员工姓名</span></Input>
      <br/>
      <Input v-model="e_idNumber" :disabled="emclass=='修改员工'?true:false"><span slot="prepend">身份证号</span></Input>
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

    <Modal  v-model="modal3" title="离职员工列表" width="90%">
      <Table :columns="columns2" :data="data2"></Table>
    </Modal>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'e_index',
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
        modal1: false,
        modal2: false,
        modal3: false,
        bjClass: '',
        kqClass: '',
        columns: [
          {
            title: '员工编号',
            key: 'e_number',
          },
          {
            title: '姓名',
            key: 'e_name',
          },
          {
            title: '年龄',
            key: 'e_age'
          },
          {
            title: '类型',
            key: 'e_type',
            render: (h, params) => {
              if(params.row.e_type == 1){
                return ("洗脚师");
              }
              if(params.row.e_type == 2){
                return ("按摩师");
              }
              if(params.row.e_type == 3){
                return ("洗头师");
              }
            }
          },
          {
            title: '性别',
            key: 'e_sex'
          },
          {
            title: '电话号码',
            key: 'e_phone'
          },
          {
            title: '组别',
            key: 'e_group'
          },
          {
            title: '等级',
            key: 'e_class',
            render: (h, params) => {
              if(params.row.e_class == 1){
                return ("一级");
              }
              if(params.row.e_class == 2){
                return ("二级");
              }
              if(params.row.e_class == 3){
                return ("三级");
              }
            }
          },
          {
            title: '今日状态',
            key: 'e_status',
            render: (h, params) => {
              if(params.row.e_status == 1){
                return ("上班中");
              }
              if(params.row.e_status == 0){
                return ("已下班");
              }
              if(params.row.e_status == 2){
                return ("迟到");
              }
              if(params.row.e_status == 3){
                return ("旷工");
              }
              if(params.row.e_status == 4){
                return ("调休");
              }
              if(params.row.e_status == 5){
                return ("事假");
              }
              if(params.row.e_status == 6){
                return ("病假");
              }
              if(params.row.e_status == 7){
                return ("早退");
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
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
                }, '上下班打卡'),
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
                }, '标记'),
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
                }, '编辑')
              ]);
            }
          }
        ],
        data: [
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 1,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 0,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 2,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 3,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 4,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 5,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 6,
            e_joinDate: '2014-03-23',
          },
          {
            e_number: 12138,
            e_name: '小黑',
            e_age: 18,
            e_type: '1',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_status: 7,
            e_joinDate: '2014-03-23',
          },
        ],
        columns2: [
          {
            title: '员工编号',
            key: 'e_number',
          },
          {
            title: '姓名',
            key: 'e_name',
          },
          {
            title: '年龄',
            key: 'e_age'
          },
          {
            title: '类型',
            key: 'e_type',
            render: (h, params) => {
              if(params.row.e_type == 1){
                return ("洗脚师");
              }
              if(params.row.e_type == 2){
                return ("按摩师");
              }
              if(params.row.e_type == 3){
                return ("洗头师");
              }
            }
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
            title: '组别',
            key: 'e_group'
          },
          {
            title: '等级',
            key: 'e_class',
            render: (h, params) => {
              if(params.row.e_class == 1){
                return ("一级");
              }
              if(params.row.e_class == 2){
                return ("二级");
              }
              if(params.row.e_class == 3){
                return ("三级");
              }
            }
          },
          {
            title: '服务介绍',
            key: 'e_skit'
          },
          {
            title: '入职时间',
            key: 'e_joinDate'
          },
          {
            title: '离职时间',
            key: 'e_OutDate'
          },
        ],
        data2: [
          {
            e_number: 12139,
            e_name: '小白',
            e_age: 38,
            e_type: '1',
            e_sex: '男',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '1',
            e_class: '1',
            e_skit: '搓澡',
            e_joinDate: '2014-03-23',
            e_OutDate: '2015-08-23',
          },
        ],
        date: '',
      }
    },
    created() {
      setInterval(()=>{
        const nowtime=new Date();
        this.date = nowtime.toLocaleString();
      },1000);
    },
    methods: {
      newEm() {
        this.emclass = '新增员工';
        this.e_name = '';
        this.e_phone = '';
        this.e_idNumber = '';
        this.e_skit ='';
        this.e_group = '';
        this.e_type = '';
        this.e_live = '';
        this.emac = true;
      },
      rowClassName(r) {
        if(r.e_status == 2) {
          return 'cd';
        }
        if(r.e_status == 3) {
          return 'kg';
        }
        if(r.e_status == 4) {
          return 'sj';
        }
        if(r.e_status == 5) {
          return 'sj';
        }
        if(r.e_status == 6) {
          return 'sj';
        }
        if(r.e_status == 7) {
          return 'cd';
        }
      },
      edit(index) {
        this.e_name = this.data[index].e_name;
        this.e_phone = this.data[index].e_phone;
        this.e_idNumber = this.data[index].e_idNumber;
        this.e_skit = this.data[index].e_skit;
        this.e_group = this.data[index].e_group;
        this.e_type = this.data[index].e_type;
        this.e_live = this.data[index].e_class;
        this.emclass = '修改员工';
        this.emac = true;
      },
      daka (index) {
        this.modal1 = true;
      },
      biaoji (index) {
        this.modal2 = true;
      },
      ok() {   //

      },
      serc() {    //搜索员工
        if (this.name == '') {
          this.$Message.warning('请输入员工名字');
        }
      },
      lizhi() {    //离职员工
        this.modal3 = true;
      },
      remove (index) {
        this.data6.splice(index, 1);
      }
    }
  };
</script>

<style>
  .herf_a{
    font-size: 14px;
    line-height: 32px;
    color: #66368C;
    cursor: pointer;
  }
  .serc{
    cursor: pointer;
  }
  .ivu-table .cd td{
    background-color: #eee;
  }
  .ivu-table .kg td{
    background-color: #FFEEE4;
  }
  .ivu-table .sj td{
    background-color: #D8E6E7;
  }
  .ivu-table .tx td{
    background-color: #d9e1e8;
  }
</style>
