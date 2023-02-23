let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username');

// Busca os dados do usuário
fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
        // Seleciona os elementos HTML para exibir os dados do usuário
        let nomeUsuario = document.getElementById("nome-usuario");
        let avatarUsuario = document.getElementById("avatar-usuario");

        // Verifica se os elementos existem antes de atualizar o conteúdo
        if (nomeUsuario && avatarUsuario) {
            // Define o nome do usuário e a imagem do avatar
            nomeUsuario.innerHTML = data.name;
            avatarUsuario.src = data.avatar_url;
        }
    })
    .catch(error => console.log(error));

// Busca os repositórios do usuário
fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        // Seleciona o elemento HTML para exibir a lista de repositórios
        let listaRepositorios = document.getElementById("lista-repositorios");

        // Limpa a lista de repositórios
        listaRepositorios.innerHTML = "";

        // Cria uma nova lista de objetos apenas com as propriedades necessárias
        let repos = data.map(repo => {
            return {
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url
            };
        });

        // Adiciona cada repositório à lista
        repos.forEach(repo => {
            let repoItem = document.createElement("li");
            let repoDiv = document.createElement("div");
            repoDiv.classList.add("repositorio-Div");
            // Adiciona o nome do repositório dentro da div
            let repoNome = document.createElement("h2");
            repoNome.innerText = repo.name;
            repoDiv.appendChild(repoNome);

            // Adiciona a descrição do repositório dentro da div
            if (repo.description) {
                let repoDescricao = document.createElement("p");
                repoDescricao.innerText = repo.description;
                repoDiv.appendChild(repoDescricao);
            }

            // Adiciona o link para o repositório dentro da div
            let repoLink = document.createElement("a");
            repoLink.href = repo.html_url;
            repoLink.innerText = "Repositório";
            repoDiv.appendChild(repoLink);

            // Adiciona a div com as informações do repositório dentro do li
            repoItem.appendChild(repoDiv);
            listaRepositorios.appendChild(repoItem);
        });
    })
    .catch(error => console.log(error));
