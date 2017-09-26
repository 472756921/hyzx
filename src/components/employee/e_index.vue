<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="员工姓名" style="margin-top: -1px">
          <span slot="append">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新增员工</Button>
      </Col>
      <Col span="2"  push="16">
        <a class="herf_a">离职员工</a>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="modal1" title="考勤打卡" @on-ok="ok"  @on-cancel="cancel">
      <div>{{date}}</div>
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
    <Modal  v-model="modal2" title="事件标记" @on-ok="ok"  @on-cancel="cancel">
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
    <Modal  v-model="emac" :title="emclass" @on-ok="ok"  @on-cancel="cancel">
      <h3>基础信息</h3>
      <br/>
      <Input v-model="e_name"><span slot="prepend">员工姓名</span></Input>
      <br/>
      <Input v-model="e_name"><span slot="prepend">身份证号</span></Input>
      <br/>
      <Input v-model="e_name"><span slot="prepend">电话号码</span></Input>
      <br/>
      <Input v-model="e_name"><span slot="prepend">服务介绍</span></Input>
      <br/>
      <h3>类型选择</h3>
      <br/>
      <RadioGroup v-model="e_class" type="button">
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
    name: 'e_index',
    data () {
      return {
        e_class: '',
        emclass: '', //新增、修改员工 modal标题
        bkDate: '',
        bjDate: '',
        name: '',
        emac: false,
        modal1: false,
        modal2: false,
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
            key: 'e_type'
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
            key: 'e_class'
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
                      this.remove(params.index)
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
            e_type: '技师',
            e_sex: '女',
            e_idNumber: 510203944839382766,
            e_phone: 17780039283,
            e_group: '技师一组',
            e_class: '一级',
            e_skit: '搓澡',
            e_joinDate: '2014-03-23',
          },
        ],
        date: '',
      }
    },
    created() {
      setInterval(this.showTime(),1000);
    },
    methods: {
      newEm() {
        this.emclass = '新增员工';
        this.emac = true;
      },
      daka (index) {
        this.modal1 = true;
      },
      biaoji (index) {
        this.modal2 = true;
      },
      showTime() {
        const nowtime=new Date();
        this.date = nowtime.toLocaleString();
      },
      cancel() {
        this.kqClass = '';
        this.modal1 = false;
      },
      ok() {

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
  }
</style>
