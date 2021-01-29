import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // IMPORTANT these names must match the collection names used in the URL!
  user: {},
  account: null,
  boards: [],
  lists: [],
  tasks: [],
  comments: []
})
