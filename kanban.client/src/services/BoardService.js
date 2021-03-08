/* eslint-ignore */

import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardService {
  async get(collection0, id = '', collection1 = '') {
    let address = collection0
    let targetCollection = collection0
    if (id) {
      address += '/' + id
      if (collection1) {
        address += '/' + collection1
        targetCollection = collection1
      }
    }
    const res = await api.get(address)
    AppState[targetCollection] = res.data
  }

  async getLists(collection0, id = '', collection1 = '') {
    let address = collection0
    // const targetCollection = collection0
    if (id) {
      address += '/' + id
      if (collection1) {
        address += '/' + collection1
        // targetCollection = collection1
      }
    }

    const res = await api.get(address)

    const sortedArr = res.data.sort((a, b) => (a.position > b.position) ? 1 : -1)

    AppState.lists = sortedArr
  }

  async add(loc, obj) {
    const res = await api.post(loc, obj)
    AppState[loc].push(res.data)
  }

  async remove(loc, id) {
    await api.delete(loc + '/' + id)
    AppState[loc] = AppState[loc].filter(i => i.id !== id)
  }

  async moveRightLists(loc, id, startInd, obj, insertInd, swapInd) {
    const res1 = await api.put(loc + '/' + id, obj)
    const res2 = await api.put(loc + '/' + AppState[loc][swapInd].id, { position: startInd })
    //

    AppState[loc].splice(insertInd, 0, res1.data)
    AppState[loc].splice(startInd, 1, res2.data)
    AppState[loc].splice(startInd + 1, 1)
  }

  async moveLeftLists(loc, id, startInd, obj, insertInd, swapInd) {
    const res1 = await api.put(loc + '/' + id, obj)
    const res2 = await api.put(loc + '/' + AppState[loc][swapInd].id, { position: startInd - 1 })

    AppState[loc].splice(insertInd, 0, res1.data)
    AppState[loc].splice(startInd - 1, 1, res2.data)
    AppState[loc].splice(startInd, 1)
  }

  async moveTask(taskId, listId) {
    const data = { listId: listId }
    await api.put('tasks/' + taskId, data)
    AppState.tasks.find(t => t.id === taskId).listId = listId
  }
}
export const boardService = new BoardService()
