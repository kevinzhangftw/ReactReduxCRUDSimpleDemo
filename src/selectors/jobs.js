import values from 'lodash/values'

export const getJobs = (state) => values(state.jobs.items)
