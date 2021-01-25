import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { mainService } from '../services/MainService'
export class MainController extends BaseController {
  constructor() {
    super('api/:collection0')
    // TODO reestablish authorization!!!
    this.router
      .get('', this.getAll)
      .get('/:parentId', this.getAll)
      .get('/:parentId/:collection1', this.getAll)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getAll(req, res, next) {
    try {
      const temp = req.params.collection1 || req.params.collection0
      const targetCollection = temp.charAt(0).toUpperCase() + temp.slice(1)
      const query = {}

      if (req.params.collection1) {
        query.parentId = req.params.parentId
      }
      res.send(await mainService.get(targetCollection, query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const targetCollection = req.params.collection0.charAt(0).toUpperCase() + req.params.collection0.slice(1)
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id

      res.send(await mainService.post(targetCollection, req.body))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const targetCollection = req.params.collection0.charAt(0).toUpperCase() + req.params.collection0.slice(1)
      req.body.creatorId = req.userInfo.id
      // REVIEW test this
      res.send(await mainService.update(targetCollection, req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const targetCollection = req.params.collection0.charAt(0).toUpperCase() + req.params.collection0.slice(1)
      // req.body.creatorId = req.userInfo.id
      res.send(await mainService.delete(targetCollection, req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
