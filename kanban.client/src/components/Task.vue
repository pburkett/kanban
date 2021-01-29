<template>
  <div class="row bg-white text-dark m-3">
    <div class="col-12">
      <div class="row mt-2 mr-1">
        <div class="col-10">
          <h5>{{ t.content }}</h5>
        </div>
        <div class="col-2">
          <button class="delete btn btn-danger" @click="remove">
            X
          </button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col text-center">
          <button class="btn-outline-primary btn" v-if="buttonRender[0]" @click="moveTask(-1)">
            &lt;---
          </button>
        </div>
        <div class="col text-center">
          <button class="btn-outline-primary btn" v-if="buttonRender[1]" @click="moveTask(1)">
            ---&gt;
          </button>
        </div>
      </div>
    </div>
    <div class="dropdown col-12 d-flex justify-content-end mt-3">
      <button type="button" class="mr-3 justify-self-end drop-toggle btn-outline-primary btn" data-toggle="dropdown">
        \/
      </button>

      <div class="dropdown-menu dropdown">
        <div v-if="comments.length > 0" class=" col-12 mb-2 pb-3 comment-div">
          <Comment v-for="c in comments" :key="c.id" :c="c" />
        </div>
        <div class="col">
          <form class="row mt-3 justify-content-center" @submit.prevent="add">
            <div class="col-10">
              <input class="mt-2" placeholder="new comment . . . " type="text" v-model="state.newComment" />
              <div class="row justify-content-end">
                <button class="btn mt-2 mr-3 btn-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { boardService } from '../services/BoardService'
import comment from '../components/Comment'
import { logger } from '../utils/Logger'
export default {

  name: 'Task',
  props: {
    t: {
      type: Object,
      required: true
    },
    buttonRender: {
      type: Array,
      required: true
    }

  },
  setup(props) {
    const state = reactive({
      newComment: '',
      loaded: false
    })
    return {
      comments: computed(() => AppState.comments.filter(c => c.taskId === props.t.id)),
      state,
      async add() {
        try {
          boardService.add('comments', { parentId: AppState.boards[0].id, taskId: props.t.id, content: state.newComment, creator: { ...AppState.account } })
        } catch (error) {
          logger.error(error)
        }
      },
      async remove() {
        try {
          boardService.remove('tasks', props.t.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async moveTask(dir) {
        try {
          const currentListIndex = AppState.lists.findIndex(l => l.id === props.t.listId)
          const nextListId = AppState.lists[currentListIndex + dir].id
          boardService.moveTask(props.t.id, nextListId)
        } catch (error) {
          logger.error(error)
        }
      },
      components: { comment }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
input {
  width: 100%;
}
.delete{
  padding: 6px;
  padding-top: 0px;
  padding-bottom: 2px;

}
.comment-div{
  border-left: 5px solid $dark;
}
.dropdown{
  width: 300px;
}

</style>
