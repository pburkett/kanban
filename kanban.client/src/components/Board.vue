<template>
  <router-link :to="{name: 'Board', params: {id: b.id}}">
    <div class="board">
      <h1>{{ b.title }}</h1>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Board',
  props: {
    b: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
