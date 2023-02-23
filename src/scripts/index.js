function buscarDados() {
    let username = document.getElementById("usernameInput").value;
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                window.location.href = "erro.html";
            } else {
                // Redireciona o usuário para a página de informações
                window.location.href = `profile.html?username=${username}`;
            }
        })
        .catch(error => console.log(error));
}
