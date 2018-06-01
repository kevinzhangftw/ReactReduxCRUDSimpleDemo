import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchJobs } from './actions/jobs'
import { getJobs } from './selectors/jobs'

class JobsContainer extends Component {
  componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchJobs())
	}

  render () {
    const { jobs } = this.props
    console.log('jobs is', jobs)
    return (
      <section className="container clearfix">
        {jobs.map(job =>
          <p key={job.id}>{job.name}</p>
        )}
      </section>
    )
  }
}

JobsContainer.propTypes = {
	dispatch: PropTypes.func,
	jobs: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => ({
	jobs: getJobs(state)
})

export default connect(mapStateToProps)(JobsContainer)
