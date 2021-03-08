<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9">
        <div class="row">
          <Board v-for="b in boards" :key="b.id" :b="b" />
        </div>
      </div>
      <div class="col-3">
        <form @submit.prevent="addBoard">
          <div class="row mt-3 justify-content-center">
            <input type="text" v-model="state.newBoard" />
          </div>
          <div class="row mt-3 justify-content-end">
            <button class="mr-3 btn-outline-success btn">Add Board</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "../components/Board";
import { onMounted, computed, reactive } from "vue";
import { AppState } from "../AppState";
import { boardService } from "../services/BoardService";
import { logger } from "../utils/Logger";
export default {
  name: "Home",
  setup() {
    const state = reactive({
      newBoard: "",
    });
    onMounted(async () => {
      await boardService.get("boards");
    });
    return {
      boards: computed(() => AppState.boards),
      state,
      async addBoard() {
        try {
          boardService.add("boards", { title: state.newBoard });
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
  components: { Board },
};
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
  > img {
    height: 200px;
    width: 200px;
  }
}
input {
  width: 80%;
}
</style>
