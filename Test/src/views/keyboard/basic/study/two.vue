<template>
  <div class="line2">
    <span v-for="(v,k) in keydata" :key="k" class="key2">
      {{keyboardLine==2 ? v : ""}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'two',
  props: ['keyboardLine'],
  data() {
    return { 
      keydata: [],
    }
  }, 
  created() { 
    this.keydata = ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\']
  }, 
  methods: {
  },
}
</script>

<style scoped lang="scss">
.line2 {
  text-align: center;
}

.key2 {
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
