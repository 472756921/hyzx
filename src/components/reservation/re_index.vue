<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="date"></DatePicker>
      </Col>
      <Col span="2">
        <Button class="hy_btn">新建预约</Button>
      </Col>
    </Row>
    <div id='calendar'></div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 're_index',
    data () {
      return {
        date: '',
      }
    },
    mounted() {
      $('#calendar').fullCalendar({
        defaultView: 'agendaDay',
        minTime: '07:00:00',
        maxTime: '22:00:00',
        timeFormat: 'H:mm',
        aspectRatio: 2.5,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'agendaDay,agendaTwoDay,agendaWeek,month'
        },
        resources: [
          { id: 'a', title: 'Room A' },
          { id: 'b', title: 'Room B' },
          { id: 'c', title: 'Room C' },
          { id: 'd', title: 'Room D' }
        ],
      });
    },
    created() {
      this.showData = this.data;
    },
    methods: {
    }
  };
</script>

<style scoped>
  #calendar{
    padding: 20px;
  }
</style>
