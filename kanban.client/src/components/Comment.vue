<template>
  <div class="row px-3">
    <div class="col-12 mt-3 comment">
      <div class="row">
        <div class="col-10" v-if="c.creator">
          <h5>{{ c.content }}</h5>
          <p class="author">
            From: {{ c.creator.name }}
          </p>
        </div>
        <div class="col-2">
          <button class="delete btn btn-danger" @click="remove">
            X
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { boardService } from '../services/BoardService'
import { logger } from '../utils/Logger'
export default {
  name: 'Comment',
  props: {
    c: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async remove() {
        try {
          boardService.remove('comments', props.c.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.delete{
  padding: 6px;
  padding-top: 0px;
  padding-bottom: 2px;

}
.author {
  font-size: 10pt;
}
.comment{
  border-radius: 10pt;
  background-color: $light;
  width: 80%;
}
</style>
