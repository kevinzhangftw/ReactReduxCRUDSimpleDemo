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
   
