<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="date"></DatePicker>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newyy">新建预约</Button>
      </Col>
    </Row>
    <div id='calendar'></div>

    <Modal v-model="model1" title="新建预约" @on-ok="ok" @on-cancel="cancel">
      <div>预约时间</div>
      <DatePicker type="datetime" v-model="newDate" placeholder="选择预约日期和时间" style="width: 200px"></DatePicker>
      <br/>
      <br/>
      <div>服务时长</div>
      <Select v-model="model4" style="width:200px">
        <Option value="0.5">0.5小时</Option>
        <Option value="1">1小时</Option>
        <Option value="1.5">1.5小时</Option>
        <Option value="2">2小时</Option>
        <Option value="2.5">2.5小时</Option>
        <Option value="3">3小时</Option>
        <Option value="3.5">3.5小时</Option>
      </Select>
      <br/>
      <br/>
      <div>服务技师</div>
      <Select v-model="model2" style="width:200px">
        <Option v-for="item in e_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <div>服务房间</div>
      <Select v-model="model3" style="width:200px">
        <Option v-for="item in r_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
//  import fullCalendar from '../../../static/fullcalendar.min';
  import scheduler from '../../../static/scheduler.min';

  export default {
    name: 're_index',
    data () {
      return {
        newDate: '',
        model1: false,
        newDate: '',
        model2: '',
        model3: '',
        model4: '',
        date: '',
        e_list: [
          {
            value: '1',
            label: '技师 A',
          },
          {
            value: '2',
            label: '技师 B',
          },
        ],
        r_list: [
          {
            value: '1',
            label: '301',
          },
          {
            value: '2',
            label: '302',
          },
        ],
        events: [
          { id: '1', resourceId: 'a', start: '2017-09-30 09:00', end: '2017-09-30 10:00', title: '302/刘德华/护理',color: '#F6D600', textColor: '#666', },
          { id: '11', resourceId: 'a', start: '2017-09-30 10:30', end: '2017-09-30 11:30', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },
          { id: '12', resourceId: 'a', start: '2017-09-30 11:30', end: '2017-09-30 13:00', title: '302/刘德华/护理',color: '#ff0000', textColor: '#eee', },
          { id: '13', resourceId: 'a', start: '2017-09-30 14:00', end: '2017-09-30 16:00', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },
          { id: '13', resourceId: 'a', start: '2017-09-30 18:00', end: '2017-09-30 19:30', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },

          { id: '2', resourceId: 'b', start: '2017-09-30 07:00', end: '2017-09-30 09:00', title: '302/刘德华/护理',color: '#F6D600', textColor: '#666', },
          { id: '21', resourceId: 'b', start: '2017-09-30 10:30', end: '2017-09-30 11:30', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },
          { id: '22', resourceId: 'b', start: '2017-09-30 14:00', end: '2017-09-30 15:00', title: '302/刘德华/护理',color: '#ff0000', textColor: '#eee', },
          { id: '23', resourceId: 'b', start: '2017-09-30 20:00', end: '2017-09-30 21:00', title: '302/刘德华/护理',color: '#38925E', textColor: '#eee', },

          { id: '5', resourceId: 'e', start: '2017-09-30 07:00', end: '2017-09-30 22:00', title: '休假' },
          { id: '5', resourceId: 'f', start: '2017-09-30 07:00', end: '2017-09-30 22:00', title: '休假' },
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
          right: 'agendaDay,agendaTwoDay,agendaWeek,month'
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
      });
    },
    created() {
      this.showData = this.data;
    },
    methods: {
      newyy() {
        this.model1 = true;
      },
      cancel() {},
      ok() {
        this.events = [...this.events,
          {
            id: '23',
            resourceId: 'c',
            start: '2017-09-30 20:00',
            end: '2017-09-30 21:00',
            title: '302/刘德华/护理',
            color: '#38925E',
            textColor: '#eee',
          }];
//        $('#calendar').fullCalendar( 'renderEvent', event [{ id: '5',source:'', resourceId: 'e', start: '2017-09-30 07:00', end: '2017-09-30 22:00', title: '休假' }]);
      },
    }
  };
</script>

<style scoped>
  #calendar{
    padding: 20px;
  }
</style>
