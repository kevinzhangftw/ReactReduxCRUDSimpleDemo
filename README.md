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
fetchJobs() makes the api call dispatch(fetchJobs()) happens in componentDidMount(), now that we have it in this.props, we want to load it into const{ jobs } 

```
render () {
    const { jobs } = this.props
    console.log('jobs is', jobs)
    return (
      <div>
        {jobs.map(job =>
          <p key={job.id}>{job.name}</p>
        )}
      </div>
    )
  }
```
It is always a good idea to specify types of props, in this case JobsContainer proptypes is specced as follows:

```
JobsContainer.propTypes = {
	dispatch: PropTypes.func,
	jobs: PropTypes.arrayOf(PropTypes.object)
}
```

Then we need to connect props to jobsContainer by defining our mapStateToProps

```
const mapStateToProps = (state, ownProps) => ({
	jobs: getJobs(state)
})
```
And then we `export default connect(mapStateToProps)(JobsContainer)`

# Using fetch-redux-crud
Now we need define our fetchJob() which is an action: `import { fetchJobs } from './actions/jobs'` Under our actions folder, we have a job.js which exports to fetchJobs(), because we are using fetch-redux-crud, we can do it like this in job.js

```
import { fetch } from 'fetch-redux-crud'

export const fetchJobs = () => fetch('jobs')
```   

we also used getJobs() in JobsContainer which is a redux selector, we need to define this selector `import { getJobs } from './selector/jobs'

```
import values from 'lodash/values'

export const getJobs = (state) => values(state.jobs.items)
``` 

lodash values just creates an array of job items.

Now that we have defined our selectors, we need to define our reducers to createStore(), our reducer takes in reducers and our thunkMiddleWare, dont worry abot composewithDevTools for now, just concentrate on reducers.

in our app.js , we defined reducers like this : `import reducers from './reducers'`, so now inside our reducers folder we have two files, index.js and jobs.js. index.js is where combine our reducers and job.js is where we defined our job reducer. we defined our index.js like this

```
import jobs from './jobs'
import { combineReducers } from 'redux'

export default combineReducers({
  jobs
})
```

In our jobs reducer, we can just fetch-redux-crud like this:

```
import { reducersFor } from 'fetch-redux-crud'

export default reducersFor('jobs')

```
