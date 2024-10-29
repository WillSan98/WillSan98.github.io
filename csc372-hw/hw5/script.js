(function(){
    document.addEventListener('DOMContentLoaded',loadDefault);
const button = document.querySelector('button');
button.addEventListener('click', search);

async function loadDefault(){
    let request = "https://api.github.com/users/WillSan98/repos?sort=created"
    fetch(request)
    .then(onResponse, onError)
    .then(handleResponse);
}

async function search() {
    const input = document.querySelector('input');
    let request = "https://api.github.com/users/" + input.value + "/repos?sort=created";
    fetch(request)
    .then(onResponse, onError)
    .then(handleResponse);
}

function onResponse(response) {
    return response.json();
}

function onError(error) {
    console.error('Error:', error);
}

function handleResponse(data) {
    let container = document.getElementById('display-container');
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
        let repo = data[i];
        let repoElement = document.createElement('div');
        repoElement.classList.add('display-box');
        let icon = document.createElement("img");
        icon.src = repo.owner.avatar_url;
        repoElement.appendChild(icon);
        let title = document.createElement("a");
        title.textContent = repo.full_name;
        title.href = repo.html_url;
        repoElement.appendChild(title);
        let description = document.createElement("p");
        description.textContent = repo.description;
        repoElement.appendChild(description);
        let update = document.createElement("p");
        update.textContent = "Last updated: " + repo.updated_at;
        repoElement.appendChild(update);
        let create_date = document.createElement("p");
        create_date.textContent = "Created: " + repo.created_at;
        repoElement.appendChild(create_date);
        let languages = document.createElement("p");
        languages.textContent = "Languages: " + repo.language;
        repoElement.appendChild(languages);
        let watchers = document.createElement("p");
        watchers.textContent = "Watchers: " + repo.watchers;
        repoElement.appendChild(watchers);
        container.appendChild(repoElement);
        
    }
    console.log(data);
}
})();