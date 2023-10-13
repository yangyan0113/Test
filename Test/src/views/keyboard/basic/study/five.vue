<template>
  <div class="line5">
    <span v-for="(v,k) in keydata" :key="k" class="key5">
      {{keyboardLine==5 ? v : ""}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'five',
  props: ['keyboardLine'],
  data() {
    return { 
      keydata: [],
    }
  }, 
  created() { 
    this.keydata = ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
  }, 
  methods: {
  },
}
</script>

<style scoped lang="scss">
.line5 {
  text-align: center;
}

.key5 {
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
