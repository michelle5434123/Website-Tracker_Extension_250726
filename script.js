//"www.awesomelead.com", "www.epiclead.com", "www.greatlead.com"
let myLeads = []
const inputEl = document.getElementById('input-el')
const btnEl = document.getElementById('input-btn')
const ulEl = document.getElementById("ul-el");
const deEl = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
const tabBtn = document.getElementById('tab-btn');

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        //{url: "https://www.linkedin.com/in/per-harald-borgen/"}
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })
})


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
          <li>
	        <a target='_blank' href= '${leads[i]}'> 
	        ${leads[i]} 
	        </a>
	      </li>
	      `
    }
    ulEl.innerHTML = listItems
}

btnEl.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
})

deEl.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



