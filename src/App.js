import React, { Component } from 'react'
import { Provider } from 'react-redux'
import * as redux from "redux"
import thunkMiddleware from 'redux-thunk'
import bows from "bows"
import { composeWithDevTools } from 'redux-devtools-extension'
import { config } from 'fetch-redux-crud'

import reducers from './reducers'
import JobsTabContainer from './JobsTabContainer'

var log = bows("App")
log("App")

config.apiUrl = 'http://localhost:3001/api/v1'
config.redirectUrl = '/login'

const store = redux.createStore(
	reducers,
	composeWithDevTools(
		redux.applyMiddleware(thunkMiddleware)
	)
)

class App extends Component {
  render() {
		console.log('they took our jobs...', this.props.jobs)

    return (
      <Provider store={store}>
				<JobsTabContainer />
			</Provider>
    )
  }
}

export default App
