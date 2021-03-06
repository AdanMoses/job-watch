function renderHeaderNav() {
  document.querySelector("#header-nav").innerHTML = `
  <nav>
  <h1><a href="/">JobWatch</a></h1>
    <ul>
      <li class="material-icons work" class="button" onclick="render('addJob')">work</li> 
      <li class="material-icons list" class="button" onclick="render('jobList')">list</li> 
      <li class="material-icons list" class="button" onclick="render('events')">event</li> 

      </ul>
  </nav>
  `;
}

renderHeaderNav();

function render(component) {
  if (component === "addJob") {
    renderAddJob();
  } else if (component === "jobList") {
    renderJobsList();
  } else if (component === "events") {
    renderEvents();
    compareDates();
  }
}
