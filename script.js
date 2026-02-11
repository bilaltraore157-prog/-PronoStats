const maCle = "fce5aa02617ac8ee0e283ab6852e49eb";

async function chargerPredictions(categorie) {
    const conteneur = document.getElementById('liste-stats');
    const titre = document.getElementById('titre-section');
    
    // Mise à jour du titre
    titre.innerText = "Meilleurs Pronos : " + categorie.toUpperCase();
    conteneur.innerHTML = "<p class='loader'>Chargement des stats...</p>";

    // Pour l'exemple, on utilise les matchs en direct pour simuler l'analyse
    const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
        "headers": { "x-rapidapi-key": maCle, "x-rapidapi-host": "v3.football.api-sports.io" }
    });
    const data = await res.json();
    conteneur.innerHTML = "";

    data.response.forEach(m => {
        // Logique de prédiction simulée selon l'onglet
        let scoreProno = Math.floor(Math.random() * (99 - 70 + 1)) + 70; // On simule un % entre 70 et 99
        
        const card = `
            <div class="stat-card">
                <div class="info-equipe">
                    <b>${m.teams.home.name}</b><br>
                    <small>${m.league.name}</small>
                </div>
                <div class="analyse">
                    <span>Fiabilité ${categorie}</span>
                    <div class="pourcentage">${scoreProno}%</div>
                </div>
            </div>
        `;
        conteneur.innerHTML += card;
    });
}

function changerOnglet(type) {
    // Gérer les boutons actifs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Charger les nouvelles données
    chargerPredictions(type);
}

// Lancer au démarrage
chargerPredictions('buts');