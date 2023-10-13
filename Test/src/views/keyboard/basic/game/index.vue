<template>
  <div class="divBody">
    <div class="divTitle">  
        <p>{{title}}</p> 
        <p>{{content}}</p>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['exercise:cekeyboardlog:add']"
        >新增</el-button>
    </div>       
  </div>
</template>
<script>  
import { getcekeyboard } from '@/api/exercise/ceKeyboard.js' 
import { addCeKeyboardLog } from '@/api/exercise/ceKeyboardLog.js'

export default {
  name: "game", 
  data() {
    return { 
      logForm: {},
      title:'',
      content: '',
      count: 0,
      letter: '', 
    };
  },
  created() {    
    this.keyboardId = this.$route.query.keyboardId
    getcekeyboard(this.keyboardId).then((res) => {
      const { code, data } = res
      if (code == 200) {
        //console.log(JSON.stringify(data))
        this.title=data.title
        this.content=data.content  
      }
    })
  }, 
  methods: { 
    prev() {
      this.$router.back(); 
    }, 
      handleAdd() { 
      this.logForm = {
        keyboardId: this.keyboardId,
        spendTime: 8,
      }
      //新增学习记录
      addCeKeyboardLog(this.logForm)
        .then((res) => { 
          console.log('恭喜：此节课程学习完毕！') 
        })
        .catch((err) => {
          console.log(JSON.stringify(err))
        })
    },
  },
};
</script>

<style scoped lang="scss">
  .divBody { 
    height: 100%; 
    color: white;
    background-color: black; 
  } 

 
</style>