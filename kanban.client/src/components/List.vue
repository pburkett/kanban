<template>
  <div class="col-3 list-top-level bg-light m-2">
    <div class="row">
      <div class="col-12">
        <button class="btn btn-danger mt-2" @click="remove">
          X
        </button>
        <h2 class="text-center">
          {{ l.title }}
        </h2>
        <div>
          <Task :button-render="[(l.position != 0), (l.position != listLength-1)]" v-for="t in tasks" :key="t.id" :t="t" />
        </div>
      </div>
      <div class="col">
        <form @submit.prevent="create">
          <input v-model="state.newTask" placeholder="new task . . . " type="text">
          <button class="btn btn-success">
            Create
          </button>
        </form>
        <div class="row mb-2 mt-2">
          <div class="col text-center">
            <button class="btn btn-outline-primary mx-2" v-if="l.position!=0" @click="moveLeft">
              &lt;---
            </button>
          </div>
          <div class="col text-center">
            <button class="btn btn-outline-primary mx-2" v-if="l.position!=listLength- 1" @click="moveRight">
              ---&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import task from '../components/Task'
import { logger } from '../utils/Logger'
import { boardService } from '../services/BoardService'
export default {
  name: 'List',

  props: {
    l: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = { newTask: '' }
    onMounted(() => {
    })
    return {
      listLength: computed(() => AppState.lists.length),
      tasks: computed(() => AppState.tasks.filter(t => t.listId === props.l.id)),
      state,
      async create() {
        try {
          boardService.add('tasks', { parentId: AppState.boards[0].id, listId: props.l.id, content: state.newTask, position: this.tasks.length })
        } catch (error) {
          logger.error(error)
        }
      },
      async remove() {
        try {
          boardService.remove('lists', props.l.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async moveRight() {
        try {
          boardService.moveRightLists('lists', props.l.id, props.l.position, { position: props.l.position + 1 }, props.l.position + 2, props.l.position + 1)
        } catch (error) {
          logger.error(error)
        }
      },
      async moveLeft() {
        try {
          boardService.moveLeftLists('lists', props.l.id, props.l.position + 1, { position: props.l.position - 1 }, props.l.position - 1, props.l.position - 1)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: { task }
}
</script>

<style lang="scss" scoped>

.list-top-level{
  height: fit-content;
}

</style>
