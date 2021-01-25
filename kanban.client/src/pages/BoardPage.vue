<template>
  <div v-if="state.loaded" class="board-page">
    <h1>{{ b.title }}</h1>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { boardService } from '../services/BoardService'
export default {
  name: 'Board',
  setup() {
    const route = useRoute()
    const state = reactive({
      loaded: false
    })
    onMounted(async() => {
      try {
        if (AppState.lists.length === 0) {
          const id = route.params.id
          await boardService.get('boards', id)
          await boardService.get('boards', id, 'lists')
          state.loaded = true
        }
      } catch (e) {
        console.error(e)
      }
    }
    )
    return { b: computed(() => AppState.boards ? AppState.boards[0] : ''), lists: computed(() => AppState.lists ? AppState.lists : ''), state }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
