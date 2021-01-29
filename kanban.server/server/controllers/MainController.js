import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { mainService } from '../services/MainService'
import { UnAuthorized } from '../utils/Errors'
export class MainController extends BaseController {
  constructor() {
    super('api/:collection0')

    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:parentId', this.getAll)
      .get('/:parentId/:collection1', this.getAll)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const temp = req.params.collection1 || req.params.collection0
      const targetCollection = temp.charAt(0).toUpperCase() + temp.slice(1)
      const query = {}
      query.creatorId = req.userInfo.id
      if (req.params.collection1) {
        query.parentId = req.params.parentId
      } else if (req.params.parentId) {
        query._id = req.params.parentId
      }
      res.send(await mainService.get(targetCollection, query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // TODO creating boards causes a bad read on line 40!!
      if (req.params.collection0 !== 'boards') {
        const boardParent = await mainService.get('Boards', { _id: req.body.parentId })
        if (boardParent[0].creatorId !== req.userInfo.id) {
          UnAuthorized()
        }
      }
      const targetCollection = req.params.collection0.charAt(0).toUpperCase() + req.params.collection0.slice(1)
      const query = {}
      req.body.creatorId = req.userInfo.id
      query.creatorId = req.userInfo.id

      res.send(await mainService.post(targetCollection, req.body))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const query = {}
      const targetCollection = req.params.collection0.charAt(0).toUpperCase() + req.params.collection0.slice(1)
      req.body.creatorId = req.userInfo.id
      query.creatorId = req.userInfo.id
      query._id = req.params.id
      res.send(await mainService.update(targetCollection, query, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const targetCollection = req.params.collection0.charAt(0).toUpperCase() + req.params.collection0.slice(1)
      const query = {}
      query.creatorId = req.userInfo.id
      query._id = req.params.id
      res.send(await mainService.delete(targetCollection, query, req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
