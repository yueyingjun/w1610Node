<template >
  <div>
  <div v-for="item in abc">
    {{item}}
  </div>
  </div>
</template>

<script>
export default {
  name: 'My',
  data () {
    return {
      abc:["a","b","c","d"]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
