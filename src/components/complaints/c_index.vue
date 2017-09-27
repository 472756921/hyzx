<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="投诉人 / 被投诉人" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建投诉</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" :title="emclass" @on-ok="ok"  >
      <span>用户选择：</span>
      <Select v-model="model1" filterable style="width:200px" :disabled="emclass=='投诉详情'?true:false">
        <Option v-for="item in u_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>技师选择：</span>
      <Select v-model="model2" filterable style="width:200px" :disabled="emclass=='投诉详情'?true:false">
        <Option v-for="item in e_list" :value="item.value" :key="item.value" >{{ item.label }}</Option>
      </Select>
      <br/>
      <br/>
      <span>投诉内容</span>
      <Input v-model="model3" type="textarea" :autosize="{minRows: 3,maxRows: 6}"  :readonly="emclass=='投诉详情'?true:false" placeholder="请输入投诉内容..."></Input>
      <br/>
      <br/>
      <span v-if="emclass=='投诉详情'">解决方案</span>
      <Input v-if="emclass=='投诉详情'" v-model="model4" type="textarea" :autosize="{minRows: 3,maxRows: 6}"  :readonly="emclass=='投诉详情'?true:false" placeholder="请输入投诉内容..."></Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'c_index',
    data () {
      return {
        u_name: '',
        emclass: '',
        name: '',
        emac: false,
        columns: [
          {
            title: '投诉顾客',
            key: 'u_name',
          },
          {
            title: '被投诉人',
            key: 'e_name'
          },
          {
            title: '投诉问题',
            key: 'c_question',
            width: 600,
          },
          {
            title: '投诉时间',
            key: 'c_date'
          },
          {
            title: '状态',
            key: 'c_status',
            render: (h, params) => {
              if(params.row.c_status == 1){
                return ("已处理");
              }
              if(params.row.c_status == 0){
                return ("未处理");
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              if(params.row.c_status == 0){
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.show(params.index)
                      }
                    }
                  }, '处理'),
                ]);
              } else {
                return h('div',[
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
                        this.edit(params.index, 1)
                      }
                    }
                  }, '详情'),
                ])
              }
            }
          }
        ],
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        data: [
          {
            u_name: '小黑',
            u_id: '1',
            e_name: '刘德华',
            e_id: '1',
            c_question: '态度恶劣，把我的脸都弄花了，非常不情愿服务，总之给我的体验非常不爽',
            c_re: '扣除当月奖金，罚款300.00',
            u_joinDate: '2014-03-23',
            c_status: '1',
            c_date: '2012-12-12',
          },
          {
            u_name: '小黑',
            u_id: '1',
            e_name: '刘德华',
            e_id: '1',
            c_question: '态度恶劣，把我的脸都弄花了，非常不情愿服务，总之给我的体验非常不爽',
            u_joinDate: '2014-03-23',
            c_status: '0',
            c_date: '2012-12-11',
          },
        ],
        u_list: [
          {
            value: '1',
            label: '刘德华',
          },
          {
            value: '2',
            label: '王小虎',
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
      }
    },
    created() {
    },
    methods: {
      newEm() {
        this.emclass = '新建投诉';
        this.emac = true;
        this.model1 = '';
        this.model2 = '';
        this.model3 = '';
      },
      edit(index) {
        this.emac = true;
        this.model1 = this.data[index].u_id;
        this.model2 = this.data[index].e_id;
        this.model3 = this.data[index].c_question;
        this.model4 = this.data[index].c_re;
        this.emclass = '投诉详情';
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
    }
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
</style>
