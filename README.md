# Fetch Redux Crud Experiment

yarn add fetch-redux-crud

# Setup 

`import { config } from 'fetch-redux-crud'`

Set up the api URL like this

```
config.apiUrl = 'http://localhost:3001/api/v1'
config.redirectUrl = '/login'
```

Then setup your redux store and provider stuff

```
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
```


In your container, grab your props in componentDidMount() 

```  
componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchJobs())
	}
```

