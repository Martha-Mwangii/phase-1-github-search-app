// Fetch  function for all user objects for provided user input:
document.addEventListener('DOMContentLoaded',() =>{
    document.querySelector('#github-form').addEventListener('submit',hundleSubmit);
})
function hundleSubmit(event){
    event.preventDefault()
    fetchUsers(event.target.search.value);
}

//fuction to fetch users from the github ApI
function fetchUsers(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        Accept: 'application/vnd.github.v3+json'
    })
    .then(resp => resp.json())
    .then(json => json.items.forEach(user => createUserList(user)))
}

//function createUserList to display users resulting from the name entered to the input form

function createUserList(user) {
    let li = document.createElement('li');
    li.className = 'user';
    //use innerHTML when sure of the operations you want to do
    // alternatively use innerText and create elements
    li.innerHTML = `
        <img src="${user.avatar_url}" class="user-avatar" />
        <h3>${user.login}</h3>
        <a href="${user.html_url}">GitHub Profile</a>
    `
    // Add event listener to username:
    li.addEventListener('click', () => {
        fetchRepos(user.login);
    });

    // Append new user data to user list:
    document.querySelector('#user-list').appendChild(li);
}

// Fetch function for all user repo objects for clicked user:
function fetchRepos(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`, {
        Accept: 'application/vnd.github.v3+json'
    })
    .then(resp => resp.json())
    .then(json => json.forEach(repo => createRepoList(repo)))
}
function createRepoList(repo) {
    let li = document.createElement('li');
    li.className = 'repo';
    li.innerHTML = `
        <p>${repo.name}</p>
        <a href="${repo.html_url}">Repo Link</a>
    `
  // Append new user data to user list:
    document.querySelector('#repos-list').appendChild(li);
}