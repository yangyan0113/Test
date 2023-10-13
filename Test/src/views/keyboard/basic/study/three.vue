<template>
  <div class="line3">
    <span v-for="(v,k) in keydata" :key="k" class="key3" 
      :style="v==hintLetter ? 'background: pink;' : 'background: black;'">  
      {{keyboardLine==3 ? v : ""}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'three',
  props: ['keyboardLine','hintLetter'],
  data() {
    return {
      keydata: [],
    }
  },  
  created() { 
    this.keydata = ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', ',', 'Enter']
  },
  methods: { 
  },
}
</script>

<style scoped lang="scss">

.line3 {
  text-align: center;
}

.key3 {  
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;   
  border: 1px solid white;
  display: -moz-inline-box; 
  display: inline-block;
} 
 
</style>
