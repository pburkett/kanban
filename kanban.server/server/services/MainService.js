
import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class MainService {
  async get(collection, query = {}) {
    const res = await dbContext[collection].find(query).populate('creator')
    return res
  }

  async post(collection, body) {
    const res = await dbContext[collection].create(body)
    return res
  }

  async update(collection, query, body) {
    const res = await dbContext[collection].findOneAndUpdate(query, body, { new: true })
    return res
  }

  async delete(collection, query, id) {
    const res = await dbContext[collection].findOneAndRemove(query)
    return res
  }
}

export const mainService = new MainService()
