import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import * as r from 'ramda'
import fixture from './todos/fixture'

//why are these vars
var mock = new AxiosMock(axios, { delayResponse: 500 })
var nextMockId = 100

export default function init() {
  mock.onGet('/todos').reply(200, fixture)

  mock.onPost('/todos').reply(function(config){
    nextMockId++
    //why is record a var
    var record = JSON.parse(config.data)
    record = r.merge(record, {
      id: nextMockId
    })
    return [200, record]
  })

  mock.onPatch(/\/todos\/\d+/).reply(200)
}
