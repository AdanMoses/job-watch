// const { default: axios } = require("axios")

// RUN THIS FUNCTION WHEN HEADER NAVIGATION BUTTON IS CLICKED!!!!
function renderJobsList() {
  document.querySelector('#page').innerHTML = `
  <section class="job-list">
    ${showJobs()}
  </section>
  `
}

function showJobs() {
  return state.jobs.map(job => `
  <section class="job" data-id=${job.id}>
    <header>
      <h2>${job.role} - ${job.company}</h2>
      <ul>
        <li><span class="material-icons delete-job" onClick="deleteJob(event)">delete job</span></li>
        <li><span class="material-icons edit-job" onClick="updateJob(event)">edit job</span></li>
      </ul>
    </header>
    <ul>
      <li>${job.close_date}</li>
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

  axios.delete(`/api/jobs/${jobId}`)
    .then(() => {
      jobDom.remove()
    })
}

function updateJob(event) {

}