<template>
  <div style="padding: 2px">
    <Button type="info" @click="newqu">添加问题</Button>
    <br/>
    <br/>
    <Table :columns="question" :data="questionData" style="width: 100%;margin: 0!important;"></Table>
    <Page :current="2" :total="50" simple class="center"></Page>

    <Modal v-model="wayf" title="解决方案">
      <div>问题描述：</div>
      <Input v-model="newquestion" :disabled="waysF" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
      <div style="margin-top: 10px">
        <div>检测报告：</div>
        <img src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" width="60px" @click="showImg('a42bdcc1178e62b4694c830f028db5c0')" class="pointer" title="点击查看大图">
        <img src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" width="60px" @click="showImg('a42bdcc1178e62b4694c830f028db5c0')" class="pointer" title="点击查看大图">
      </div>
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
      <div style="margin: 10px 0">治疗完成时间：</div>
    </Modal>

    <Modal v-model="newquestionF" title="新建问题">
      <Input v-model="newquestion" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
      <br/>
      <br/>
      <imgUp></imgUp>
    </Modal>

    <Modal v-model="operatingF" title="完成疗程">
      <div style="margin: 0 0 10px 0">您确定该用户完成了疗程</div>
      <div>治疗结果：</div>
      <Input v-model="complete" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
    </Modal>

    <Modal title="查看图片" v-model="visible" style="z-index: 99999;position: absolute">
      <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import imgUp from '../ut/imgUp.vue';

  export default {
    name: 'u_questionList',
    components: {imgUp},
    data(){
      return {
        visible: false,
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
          {date: '2012-12-12', question: '皮肤暗沉', resti: 1, status: 1, completeDate: '2013-03-12'},
          {date: '2012-12-12', question: '眼部皮肤松弛', resti: 2, status: 0, completeDate: '未完成'},
          {date: '2012-12-12', question: '眼袋', resti: 3, status: 1, completeDate: '2013-03-12'},
          {date: '2012-12-12', question: '黄褐斑', resti: 0, status: 0, completeDate: '未完成'},
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
      showImg(img){
        this.visible = true;
        this.imgName = img;
      },
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
  .center{
    margin: 10px auto;
    text-align: center;
  }
  .pointer{
    cursor: pointer;
  }
</style>
