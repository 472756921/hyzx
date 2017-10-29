<template>
  <div>
    <Button type="info" @click="newqu">添加问题</Button>
    <br/>
    <br/>
    <Table :columns="question" :data="questionData"></Table>
    <Modal v-model="wayf" title="解决方案">
      <RadioGroup v-model="radio">
        <Radio label="1" :disabled="waysF">基础方案</Radio>
        <Radio label="2" :disabled="waysF">推荐方案</Radio>
        <Radio label="3" :disabled="waysF">最优方案</Radio>
      </RadioGroup>
      <br/>
      <br/>
      <Input v-model="textarea" type="textarea" :disabled="waysF" :autosize="{minRows: 2,maxRows: 5}"></Input>
      <div style="margin: 10px 0">治疗结果：</div>
      <Input v-model="complete" type="textarea" disabled :autosize="{minRows: 2,maxRows: 5}"/>
    </Modal>

    <Modal v-model="newquestionF" title="新建问题">
      <Input v-model="newquestion" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
    </Modal>

    <Modal v-model="operatingF" title="完成疗程">
      <div style="margin: 0 0 10px 0">您确定该用户完成了疗程</div>
      <div>治疗结果：</div>
      <Input v-model="complete" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'u_questionList',
    data(){
      return {
        complete: '',
        newquestion: '',
        newquestionF: false,
        operatingF: false,
        wayf: false,
        waysF: true,
        textarea: '',
        radio: '',
        question: [
          {key: 'date', title: '添加日期'},
          {key: 'question', title: '问题描述'},
          {key: 'resti', title: '决绝方案', render:(h, p)=>{if(p.row.resti === 1){return '基础方案'}else if(p.row.resti === 2 ){return '推荐方案'} else if(p.row.resti === 3 ) {return '最优方案'}else if(p.row.resti === 0 ) {return '未指定'}}},
          {key: 'status', title: '状态', render:(h, p)=>{if(p.row.status === 1){return '已解决'}else if(p.row.status === 0 ){return '正在解决'}}},
          {key: 'action', title: '操作', render: (h, params) => {
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
                    this.way(params.row)
                  }
                }
              }, '解决方案'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if(params.row.status == 1){
                      this.$Message.warning('该疗程已经完成');
                      return false;
                    }
                    this.operating(params.index)
                  }
                }
              }, '完成疗程'),
            ]);
          }},
        ],
        questionData: [
          {date: '2012-12-12', question: '皮肤暗沉', resti: 1, status: 1},
          {date: '2012-12-12', question: '眼部皮肤松弛', resti: 2, status: 0},
          {date: '2012-12-12', question: '眼袋', resti: 3, status: 1},
          {date: '2012-12-12', question: '黄褐斑', resti: 0, status: 0},
        ],
      }
    },
    watch: {
      radio(n, o){
        if(this.radio == 1){
          this.textarea = '基础方案';
        }
        if(this.radio == 2){
          this.textarea = '推荐方案';
        }
        if(this.radio == 3){
          this.textarea = '最优方案';
        }
      },
    },
    methods: {
      operating() {
        this.operatingF = true;
      },
      newqu() {
        this.newquestionF = true;
      },
      way(row) {
        if(row.resti == 0) {
          this.waysF = false;
        } else {
          this.radio = row.resti;
          this.waysF = true;
        }
        this.wayf = true;
      },
      datile() {},
    },
  };
</script>

<style>
  .ivu-table .redBack td{
    background-color: #fff4f3;
  }
</style>
