function getJobData() {

  axios.get('/api/jobs')
    .then(response => {
      state.jobs = response.data
    })
    .then(renderEditJob)

}

function renderEditJob() {
  const id = window.location.pathname.split("/").splice(2)[0]
  const selectedJob = state.jobs.find(job => job.id == id)
  console.log(selectedJob)
  document.querySelector('#page').innerHTML = `
  <section class="job">
    <h1>Edit Job</h1>

    <form onsubmit="editJob(event)">
      <section id="error"></section>

      <fieldset>
        <label for="">Role:</label>
        <input type="text" name="role" value=${selectedJob.role}>
      </fieldset>

      <fieldset>
        <label for="">Company:</label>
        <input type="text" name="company" value=${selectedJob.company}>
      </fieldset>
      
      <fieldset>
        <label for="">Link to ad:</label>
        <input type="text" name="link" value=${selectedJob.link}>
      </fieldset>

      <fieldset>
        <label for="">Close date:</label>
        <input type="date" name="date" value=${selectedJob.date}>
      </fieldset>

      <fieldset>
        <label for="">Contact person:</label>
        <input type="text" name="contact" value=${selectedJob.contact}>
      </fieldset>

      <fieldset>
        <label for="">Notes:</label>
        <textarea name="notes" id="" cols="30" rows="10" value=${selectedJob.notes}></textarea>
      </fieldset>

      <fieldset>
        <label for="">Status:</label>
        <input type="radio" id="Completed" name="status" value="Completed">
        <label for="completed">Completed</label><br>

        <input type="radio" id="Incomplete" name="status" value="Incomplete">
        <label for="incomplete">Incomplete</label>
      </fieldset>
      
      <button id="add-job">Submit</button>

    </form>
  </section>
  `
}

function editJob(event) {
  event.preventDefault()
  const form = event.target

  const id = window.location.pathname.split("/").splice(2)[0]
  console.log(id)

  const data = Object.fromEntries(new FormData(form))

  axios.patch(`/api/jobs/${id}`, data) // need to get id from where
    .then(successResponse => {
      const updatedJob = successResponse.data
      console.log(updatedJob)
    })
    .catch(errorResponse => {
      document.querySelector('#error')
        .innerHTML = errorResponse.response.data.message
    })
}

getJobData()


// Could use renderAddJob to hand both create and update actions
// function addOrEdit(action) {
//   if (action === "edit") {
//     return "editJob(event)"
//   } else {
//     return "createJob(event)"
//   }
// }