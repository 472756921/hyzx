<template>
  <div>

    <Tabs value="name1">
      <TabPane label="店日报" name="name1"></TabPane>
      <TabPane label="店月报" name="name2"></TabPane>
      <TabPane label="顾问报表" name="name3"></TabPane>
      <TabPane label="店长报表" name="name5"></TabPane>
      <TabPane label="考勤表" name="name6"></TabPane>
    </Tabs>

    <Table :columns="columns" :data="showData"></Table>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'r_index',
    data () {
      return {
        name: '',
        columns: [
          {
            title: '报表时间',
            key: 'r_date',
          },
          {
            title: '报表类型',
            key: 'r_type'
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
                ]);
              }
          }
        ],
        r_type: '考勤表',
        showData: [],
        data: [
          {
            r_type: '经营报表',
            r_date: '2015-12-12',
          },
        ],
        data2: [
          {
            r_type: '考勤表',
            r_date: '2015-12-12',
          },
        ],
      }
    },
    created() {
      this.showData = this.data;
    },
    methods: {
      newEm() {
        if(this.r_type == '经营报表'){
          this.r_type = '考勤表';
          this.showData = this.data;
        } else {
          this.r_type = '经营报表';
          this.showData = this.data2;
        }
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
