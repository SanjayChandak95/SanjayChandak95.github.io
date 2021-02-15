// Creates a job card
function createjobCard(job) {
    // Creates a div element
    const card = document.createElement('div');
    card.className = 'job';
    card.setAttribute('data-id', job.id)

    const company = document.createElement('p');
    company.innerText = job.company;
    company.className = 'job__company';
  
    const experience = document.createElement('p');
    experience.innerText = job.minExp.toLocaleString() +" year to "+ job.maxExp.toLocaleString()+" year";
    experience.className = 'job__description';
  
    const price = document.createElement('span');
    price.innerText = job.salary.toLocaleString() +" INR/year";
    price.className = 'job__salary';

    const jobUrl = document.createElement("a");
    jobUrl.href = job.url;
    jobUrl.className = "job__joburl";
    jobUrl.target = "_blank"
    // jobUrl.innerHTML = "Click Here to Apply"
    const title = document.createElement('h3');
    title.innerText = job.title;
    title.className = 'job__name';
    jobUrl.appendChild(title)

    const newLine = document.createElement("br");
    const horizontalLine = document.createElement("hr");
  
    Array.from([jobUrl,company,experience, price, newLine,horizontalLine]).forEach(elem => card.appendChild(elem));
    return card;
  }


function renderAllCards(jobs){
    const renderRoot = document.getElementById('cards-root');

  // First remove existing children so that we don't append to the 
  // existing list. DO NOT remove this
  renderRoot.innerHTML = '';

  // Now iterate over the list passed as a param to render all the cards
  Array.from(jobs).forEach((job) => {
    // Render the element
    const card = createjobCard(job);

    // Append that child
    renderRoot.appendChild(card);
  });
}

function getFilterData(key,value,jobs){
    if(value == ""){
        return jobs
    }
    var result = new Array()
    Array.from(jobs).forEach(job => {
        if(key == "Exp"){
            if(Number(value) >= Number(job.minExp) && Number(value) <= Number(job.maxExp)){
                result.push(job)
            }
        }
        else if(key == "salary"){
            if(Number(value) <= Number(job[key])){
                result.push(job)
            }
        }
        else{
            if(job[key].toLowerCase().includes(value.toLowerCase())){
                result.push(job)
            }
        }
    });
    return result
}

function addEventHandlers(){
    const searchForm = document.getElementById("search-button")
    searchForm.addEventListener("click",function(e){
        e.preventDefault()
        const jobPost = document.getElementById("jobPost").value
        const experience = document.getElementById("experience").value
        const salary = document.getElementById("salary").value
        
        var filteredJobs = getFilterData("title", jobPost, window.jobs)
        filteredJobs = getFilterData("salary",salary,filteredJobs)
        filteredJobs = getFilterData("Exp",experience , filteredJobs)
        renderAllCards(filteredJobs)
    })
}