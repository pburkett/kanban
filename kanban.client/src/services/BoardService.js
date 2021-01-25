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
}

export const boardService = new BoardService()
