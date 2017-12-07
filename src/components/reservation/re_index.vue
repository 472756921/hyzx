<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <DatePicker type="date" placeholder="选择日期" style="width: 100%" v-model="date"></DatePicker>
      </Col>
      <Col span="1">
        <Button class="hy_btn" @click="seacher">查询</Button>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newyy">新建预约</Button>
      </Col>
    </Row>
    <div id='calendar'></div>

    <Modal v-model="model1" title="新建预约" @on-ok="ok">
      <div>开始时间</div>
      <DatePicker type="datetime" v-model="newDate" placeholder="选择预约日期和时间" :options="options" style="width: 200px"></DatePicker>
      <br/>
      <br/>
      <div>结束时间</div>
      <DatePicker type="datetime" v-model="newDate2" placeholder="选择预约日期和时间" :options="options" style="width: 200px"></DatePicker>
      <br/>
      <br/>
      <div>服务项目</div>
      <Select v-model="model2" style="width:200px">
        <Option v-for="(item, i) in e_list" :value="item.value" :key="i">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <div>技师</div>
      <Select v-model="model5" style="width:200px">
        <Option value="a">技师A</Option>
        <Option value="b">技师B</Option>
        <Option value="c">技师C</Option>
        <Option value="d">技师D</Option>
        <Option value="e">技师E</Option>
        <Option value="f">技师F</Option>
      </Select>
      <br/>
      <br/>
      <div>服务房间</div>
      <Select v-model="model3" style="width:200px">
        <Option v-for="(item, i) in r_list" :value="item.value" :key="i">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <div>用户</div>
      <Input v-model="model4" placeholder="请输入用户电话号码"  style="width:200px"><Button slot="append" icon="ios-search" @click="sercUser"></Button></Input>
      <div style="margin: 6px 0">{{userInfo}}</div>
      <br/>
      <Button v-if="transformF" type="success">生成服务单</Button>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import scheduler from '../../../static/scheduler.min';
  import {re_Alllist} from '../../interface';

  export default {
    name: 're_index',
    data () {
      return {
        newDate: '',
        newDate2: '',
        model1: false,
        model2: '',
        model3: '',
        model4: '',
        model5: '',
        userInfo: '',
        date: '',
        transformF: false,
        e_list: [{
            value: '美白',
            label: '美白',
          },{
            value: '嫩肤',
            label: '嫩肤',
        },],
        r_list: [{
            value: 301,
            label: '301',
          },{
            value: 302,
            label: '302',
        },],
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        events: [
          { id: '1', resourceId: 'a', start: '2017-10-27 09:00', end: '2017-10-27 10:00', title: '302/刘德华/护理',color: '#F6D600', textColor: '#666', },
          { id: '11', resourceId: 'a', start: '2017-10-27 10:30', end: '2017-10-27 11:30', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },
          { id: '12', resourceId: 'a', start: '2017-10-27 11:30', end: '2017-10-27 13:00', title: '302/刘德华/护理',color: '#ff0000', textColor: '#eee', },
          { id: '13', resourceId: 'a', start: '2017-10-27 14:00', end: '2017-10-27 16:00', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },
          { id: '13', resourceId: 'a', start: '2017-10-27 18:00', end: '2017-10-27 19:30', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },

          { id: '2', resourceId: 'b', start: '2017-10-27 07:00', end: '2017-10-27 09:00', title: '302/刘德华/护理',color: '#F6D600', textColor: '#666', },
          { id: '21', resourceId: 'b', start: '2017-10-27 10:30', end: '2017-10-27 11:30', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },
          { id: '22', resourceId: 'b', start: '2017-10-27 14:00', end: '2017-10-27 15:00', title: '302/刘德华/护理',color: '#ff0000', textColor: '#eee', },
          { id: '23', resourceId: 'b', start: '2017-10-28 09:00', end: '2017-10-28 11:00', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },

          { id: '5', resourceId: 'e', start: '2017-10-28 07:00', end: '2017-10-28 22:00', title: '休假' },
          { id: '5', resourceId: 'f', start: '2017-10-28 07:00', end: '2017-10-28 22:00', title: '休假' },
        ],
      }
    },
    mounted() {
      $('#calendar').fullCalendar({
        defaultView: 'agendaDay',
        minTime: '07:00:00',
        maxTime: '22:00:00',
        timeFormat: 'H:mm',
        aspectRatio: 2.4,
        monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日',
        },
        titleFormat: 'YYYY - MM - DD',
        allDayText: '全天',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'agendaDay'
        },
        resources: [
          { id: 'a', title: '技师 A' },
          { id: 'b', title: '技师 B' },
          { id: 'c', title: '技师 C' },
          { id: 'd', title: '技师 D' },
          { id: 'e', title: '技师 E', eventColor: '#eee', eventTextColor: '#333' },
          { id: 'f', title: '技师 F', eventColor: '#eee', eventTextColor: '#333' },
        ],
        events: this.events,
        eventClick: (calEvent, jsEvent, view)=>{
          if(calEvent.title == "休假") {
            return false;
          }
          this.transformF = true;
          this.model1 = true;
        },
        dayClick: (calEvent, jsEvent, view)=>{
          this.newyy();
        },
      });
    },
    created() {
      this.showData = this.data;
      let myDate = new Date();
      let result = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate() ;
      console.log(result)
      this.getList(result);
    },
    methods: {
      seacher() {},
      getList(date) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: re_Alllist() + '?scheduleDate=' + date,
        }).then((res) => {
//          this.order = res.data.results;
        }).catch((error) => {
        });
      },
      sercUser(){
        this.userInfo = '已经找到用户 刘德华';
      },
      formatDate(now) {
        var year=now.getYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
      },
      newyy() {
        this.model1 = true;
        this.newDate = '';
        this.newDate2 = '';
        this.model2 = '';
        this.model3 = '';
        this.model4 = '';
        this.model5 = '';
        this.transformF = false;
      },
      ok() {
        if( this.newDate == '' ||  this.newDate2 == '' || this.model2 == '' || this.model3 == '' || this.model4 == '' || this.model5 == '') {
          this.$Message.error('请完整填写预约信息');
          return false
        }
        const events = {
            id: '23',
            resourceId: this.model5,
            start: this.newDate,
            end: this.newDate2,
            title: this.model2 + '/' +this.model3 + '/' +this.model4,
            color: '#38925E',
            textColor: '#eee',
          };
        $('#calendar').fullCalendar( 'renderEvent', events, true);
      },
    }
  };
</script>

<style scoped>
  #calendar{
    padding: 20px;
  }
</style>
