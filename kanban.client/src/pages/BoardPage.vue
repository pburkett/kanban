<template>
  <div class="container-fluid min-height cont">
    <div class="row">
      <div class="col">
        <div v-if="state.loaded" class="board-page">
          <h1 class="text-white text-shadow">
            {{ b.title }}
          </h1>
        </div>
      </div>
    </div>
    <div class="row list-row">
      <List v-for="l in lists" :key="l.id" :l="l" />
      <div class="col">
        <form @submit.prevent="addList">
          <input type="text" v-model="state.newList" />
          <button class="btn btn-success">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { boardService } from '../services/BoardService'
import list from '../components/List'
export default {
  name: 'Board',
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: '',
      loaded: false
    })
    onMounted(async() => {
      try {
        const id = route.params.id
        await boardService.get('boards', id)
        await boardService.getLists('boards', id, 'lists')
        await boardService.get('boards', id, 'tasks')
        await boardService.get('boards', id, 'comments')
        state.loaded = true
      } catch (e) {}
    })
    return {
      b: computed(() => (AppState.boards ? AppState.boards[0] : '')),
      lists: computed(() => (AppState.lists ? AppState.lists : '')),
      state,
      route: useRoute(),
      async addList() {
        try {
          boardService.add('lists', {
            title: state.newList,
            position: this.lists.length,
            parentId: this.b.id
          })
        } catch (error) {}
      }
    }
  },
  components: { list }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.cont {
  background-image: url("../assets/img/sunset-img.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.list-row {
  flex-wrap: nowrap;
  overflow: auto;
  height: 100%;
  transform: translateY(-56px);
  padding-top: 56px;
}
.min-height {
  min-height: 100%;
}
.text-shadow {
  text-shadow: $dark-transparent 0.2rem 0rem 5px,
    $dark-transparent -0.2rem 0rem 5px, $dark-transparent 0rem 0.2rem 5px,
    $dark-transparent 0rem -0.2rem 5px;
}
</style>
