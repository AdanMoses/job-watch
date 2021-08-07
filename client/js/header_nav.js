function renderHeaderNav() {
  document.querySelector("#header-nav").innerHTML = `
  <nav>
    <h1>JobWatch</h1>

    <ul>
      <li class="material-icons work" class="button" onclick="render('addJob')">work</li> 
      <li class="material-icons list" class="button" onclick="render('jobList')">list</li> 
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
  }
}

const button = document.querySelector('.button')
let clicked = false

button.addEventListener('click', () => {
  if (clicked) {
    render("addJob")
    clicked = false

  } else {
    document.querySelector('#page').innerHTML = ""
    clicked = true
  }
})