
import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class MainService {
  async get(collection, query = {}) {
    const res = await dbContext[collection].find(query)
    return res
  }

  async post(collection, body) {
    const res = await dbContext[collection].post(body)
    return res
  }

  async update(collection, id, body) {
    const res = await dbContext[collection].findOneAndUpdate(id, body, { new: true })
    return res
  }

  async delete(collection, id) {
    const res = await dbContext[collection].findOneAndRemove(id)
    return res
  }
}

export const mainService = new MainService()
