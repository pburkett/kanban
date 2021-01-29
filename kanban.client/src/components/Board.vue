<template>
  <div class="blog col-3 mx-3 my-3 box-shadow">
    <router-link :to="{ name: 'Board', params: {id: b.id} }">
      <div class="img-row row">
      </div>
      <div class="row header-row justify-content-center">
        <div class="col-8 blog-header text-light">
          <h5>{{ b.title }}</h5>
        </div>
      </div>
    </router-link>
    <div class="row justify-content-around">
      <div class="col-5">
        <p v-if="!state.name || you === state.name" class="bold">
          Owner: You
        </p>
        <p v-else class="text-secondary">
          Owner: {{ state.name }}
        </p>
      </div>
      <div class="col-5">
        <button class="btn-danger btn ml-3" @click="remove">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { logger } from '../utils/Logger'
import { computed, reactive } from 'vue'
export default {
  name: 'Board',
  props: {
    b: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      name: props.b.creator ? props.b.creator.name : ''
    })
    return {
      async remove() {
        try {
          boardService.remove('boards', props.b.id)
        } catch (error) {
          logger.error(error)
        }
      },
      you: computed(() => AppState.account.name),
      state

    }
  }
}
</script>

  <style lang="scss" scoped>
    @import 'bootstrap';
    @import '../assets/scss/_variables';

    .w-fit {
    width: fit-content !important;
    }
    .blog-header {
    height: 80px;
    background-color: $primary;
    border-radius: 8px;
    transform: translateY(-60px);
    }
    .header-row {
    height: 40px;
    }
    .box-shadow {
    box-shadow: 2px 2px 9px $dark-transparent, 2px -2px 9px $dark-transparent, -2px -2px 9px $dark-transparent, -2px 2px 9px $dark-transparent;
    }
    .img-row {
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../assets/img/sunset-img.png')
    }
    .bold{
      font-weight: 500;
    }
  </style>
