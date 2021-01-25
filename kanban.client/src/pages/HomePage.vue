<template>
  <div class="home">
    <Board v-for="b in boards" :key="b.id" :b="b" />
  </div>
</template>

<script>
import Board from '../components/Board'
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      if (AppState.boards.length === 0) {
        await boardService.get('boards')
        console.log(AppState.lists)
      }
    })
    return { boards: computed(() => AppState.boards) }
  },
  components: { Board }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
