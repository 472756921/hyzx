<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="编号 / 名称" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
    </Row>

    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="emac" title="项目信息" @on-ok="ok"  >
      <div>项目编号：{{project.code}}</div>
      <br/>
      <div>项目名称：{{project.projectName}}</div>
      <br/>
      <div>项目类型：{{project.type}}</div>
      <br/>
      <div>单次价格：{{project.money}}</div>
      <br/>
      <div>疗程价格：{{project.money}}</div>
      <br/>
      <div>卡扣疗程价格：{{project.money}}</div>
      <br/>
      <div>体验价格：{{project.money}}</div>
      <br/>
      <div>间隔：{{project.intervalTime}}</div>
      <br/>
      <div>功效：{{project.effect==1?'强':'弱'}}</div>
      <br/>
      <div>备注：{{project.intervalTime}}</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import {p_list} from '../../interface';
  export default {
    name: 'p_index',
    data () {
      return {
        name: '',
        project: '',
        emac: false,
        columns: [
          {
            title: '项目编号',
            key: 'code',
          },
          {
            title: '项目名称',
            key: 'projectName'
          },
          {
            title: '项目类型',
            key: 'type',
          },
          {
            title: '功效',
            key: 'effect',
            render: (h, p) => {
              if(p.row.effect == 0) {
                return '弱';
              }
              if(p.row.effect == 1) {
                return '强';
              }
            },
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
                      this.edit(params.index, 1)
                    }
                  }
                }, '详情'),
              ]);
            }
          }
        ],
        data: [],
      }
    },
    created() {
      this.getList(1);
    },
    methods: {
      edit(index) {
        this.emac = true;
        this.project = this.data[index];
      },
      ok() {   //

      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户或技师名字');
        }
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: p_list() + '?page='+page+'&pageSize=50',
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
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
