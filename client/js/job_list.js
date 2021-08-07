// const { default: axios } = require("axios")

// RUN THIS FUNCTION WHEN HEADER NAVIGATION BUTTON IS CLICKED!!!!
function renderJobsList() {
  document.querySelector('#page').innerHTML = `
  <section class="job-columns">
    <div class="job-list">
      ${showJobs()}
    </div>
  </section>
  `
}

function showJobs() {
  // make axios request to get all jobs by user
  console.log(state.jobs)
  return state.jobs.map(job => `
  <section class="job" data-id=${job.id}>
    <header>
      <h2>${job.role} - ${job.company}</h2>
      <ul>
        <li><span class="material-icons delete-job" onClick="deleteJob(event)">delete job</span></li>
        <li><span class="material-icons edit-job"><a href="/jobs/${job.id}">edit</a></span></li>
      </ul>
    </header>
    <ul>
      <li>${job.close_date.slice(0, 10)}</li>
      <li>${job.contact}</li>
      <li>${job.notes}</li>
      <li>${job.status}</li>
    </ul>
  </section>
  `).join('')
}

function deleteJob(event) {
  const deleteButton = event.target
  const jobDom = deleteButton.closest('.job')
  const jobId = jobDom.dataset.id
  // console.log(event.target)
  // console.log(jobId)
  axios.delete(`/api/jobs/${jobId}`)
    .then(() => {
      jobDom.remove()
      // resp.json({deleted : `treasure ID ${jobId}`})
    })
    .catch(error => {
      console.log(error)
    })
}

