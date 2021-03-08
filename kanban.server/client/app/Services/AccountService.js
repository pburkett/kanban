import { ProxyState } from '../AppState.js'
import { api } from './AxiosService.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      ProxyState.account = res.data
    } catch (err) {
    }
  }
}

export const accountService = new AccountService()
