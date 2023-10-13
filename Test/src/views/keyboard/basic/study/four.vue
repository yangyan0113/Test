<template>
  <div class="line4">
    <span v-for="(v,k) in keydata" :key="k" class="key4">
      {{keyboardLine==4 ? v : ""}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'four',
  props: ['keyboardLine'],
  data() {
    return { 
      keydata: [],
    }
  }, 
  created() { 
    this.keydata = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift']
  }, 
  methods: {
  },
}
</script>

<style scoped lang="scss">
.line4 {
  text-align: center;
}

.key4 {
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
