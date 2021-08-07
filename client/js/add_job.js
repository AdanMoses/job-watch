function renderAddJob() {
  document.querySelector('#page').innerHTML = `
  <section class="job">
    <h2>Add Job</h2>

    <form id="add-job" onsubmit="createJob(event)">
      <section id="error"></section>

      <fieldset>
        <label for="">Role:</label>
        <input type="text" name="role">
      </fieldset>

      <fieldset>
        <label for="">Company:</label><br>
        <input type="text" name="company">
      </fieldset>
      
      <fieldset>
        <label for="">Link to ad:</label><br>
        <input type="text" name="link">
      </fieldset>

      <fieldset>
        <label for="">Close date:</label><br>
        <input type="date" name="date">
      </fieldset>

      <fieldset>
        <label for="">Contact person:</label><br>
        <input type="text" name="contact">
      </fieldset>

      <fieldset>
        <label for="">Notes:</label><br>
        <textarea name="notes" id="" cols="30" rows="10"></textarea>
      </fieldset>

      <fieldset>
        <label for="">Status:</label>
          <ul>
            <li>
              <input type="radio" name="status" value="Completed">
              <label for="completed" id="completed">Completed</label><br>
            </li>

            <li>
             <input type="radio" name="status" value="Incomplete">
             <label for="incomplete" id="incomplete">Incomplete</label>
            </li>
          </ul>

      </fieldset>
      
      <button id="add-job">Submit</button>

    </form>
  </section>
  `
}

function createJob(event) {
  event.preventDefault()
  // console.log(state.jobs)
  const form = event.target

  const data = Object.fromEntries(new FormData(form))

  axios.post('/api/jobs', data)
    .then(successResponse => {
      const newJob = successResponse.data
      state.jobs.push(newJob)
      // hide addjob after posting the job
      document.querySelector('.job').innerHTML = "";
      // show jobslist
      renderJobsList()
    })
    .catch(errorResponse => {
      document.querySelector('#error')
        .innerHTML = errorResponse.response.data.message
    })
}

// renderAddJob()