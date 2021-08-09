// const { default: axios } = require("axios")
function renderJobsList() {
  document.querySelector('#page').innerHTML = `
  <section class="job-columns">
    <div class="job-list-completed">
      <h2>To Apply</h2>
      ${showJobsIncomplete()}
    </div>
    <div class="job-list-incomplete">
      <h2>Applied</h2>
      ${showJobsCompleted()}
    </div>
  </section>
  `
}
// separate jobs applied and not applied


function showJobsIncomplete() {
  // make axios request to get all jobs by user
  const incompleteJobs = state.jobs.filter(job => job.status === "Incomplete")
  return incompleteJobs.map(job =>  `
  <section class="job-card" data-id=${job.id}>
    <header class="card-title">
      <h3>${job.role}</h3>
      <h4>@</h4>
      <h3>${job.company}</h3>
    </header>
    <ul class="card-list">
      <li class="card-list-close-date"><span class="card-list-title-text">Close Date</span><br>${job.close_date.slice(0, 10)}</li>
      <li class="card-list-contact-person"><span class="card-list-title-text">Contact Person</span><br>${job.contact}</li>
      <li class="card-list-notes"><span class="card-list-title-text">Notes</span><br>${job.notes}</li>
    </ul>
    <ul class="edit-list">
      <li id="job-edit-button"><span class="material-icons edit-job"><a href="/jobs/${job.id}">edit</a></span></li>
      <li class="material-icons link-to-job"><a href="${job.link}">link</a></li>
      <li id="job-delete-button"><span class="material-icons delete-job" onClick="deleteJob(event)">delete job</span></li>
    </ul>
  </section>

  `)
    .join('')
}

function showJobsCompleted() {
  // make axios request to get all jobs by user
  const completedJobs = state.jobs.filter(job => job.status === "Completed")
  return completedJobs.map(job =>  `
  <section class="job-card" data-id=${job.id}>
    <header class="card-title">
      <h3>${job.role}</h3>
      <h4>@</h4>
      <h3>${job.company}</h3>
    </header>
    <ul class="card-list">
      <li class="card-list-close-date"><span class="card-list-title-text">Close Date</span><br>${job.close_date.slice(0, 10)}</li>
      <li class="card-list-contact-person"><span class="card-list-title-text">Contact Person</span><br>${job.contact}</li>
      <li class="card-list-notes"><span class="card-list-title-text">Notes</span><br>${job.notes}</li>
    </ul>
    <ul class="edit-list">
      <li id="job-edit-button"><span class="material-icons edit-job"><a href="/jobs/${job.id}">edit</a></span></li>
      <li class="material-icons link-to-job"><a href="${job.link}">link</a></li>
      <li id="job-delete-button"><span class="material-icons delete-job" onClick="deleteJob(event)">delete job</span></li>
    </ul>
  </section>

  `)
    .join('')
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
      res.json({deleted : `job ID ${jobId}`})
    })
    .catch(error => {
      res.json({error: error})
    })
}

