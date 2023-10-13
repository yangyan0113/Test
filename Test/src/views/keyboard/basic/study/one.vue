<template>
  <div class="line1">
    <span v-for="(v,k) in keydata" :key="k" class="key1">
      {{keyboardLine==1 ? v : ""}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'one',
  props: ['keyboardLine'],
  data() {
    return { 
      keydata: [],
    }
  }, 
  created() { 
    this.keydata = ['`', '1', '2', '3', '4', '5', '6', '7', '8', 'F9', '0', '-', '=', 'Del']; 
  }, 
  methods: { 
  },
}
</script>

<style scoped lang="scss">
.line1 {
  text-align: center;
}

.key1 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px; 
  border: 1px solid white;   
  display: -moz-inline-box; /* css注释：for ff2 */
  display: inline-block;
} 
</style>
