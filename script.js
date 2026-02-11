const maCle = "fce5aa02617ac8ee0e283ab6852e49eb";

async function chargerPredictions(categorie) {
    const conteneur = document.getElementById('liste-stats');
    const titre = document.getElementById('titre-section');
    
    titre.innerText = "Meilleurs Pronos : " + categorie.toUpperCase();
    conteneur.innerHTML = "<p class='loader'><i class='fas fa-spinner fa-spin'></i> Analyse des données en cours...</p>";

    try {
        const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            "headers": { "x-rapidapi-key": maCle, "x-rapidapi-host": "v3.football.api-sports.io" }
        });
        const data = await res.json();
        
        // On crée une liste propre pour pouvoir la trier
        let matchs = data.response.map(m => {
            return {
                domicile: m.teams.home.name,
                ligue: m.league.name,
                // On garde ta logique de simulation entre 70 et 99%
                scoreProno: Math.floor(Math.random() * (99 - 70 + 1)) + 70 
            };
        });

        // TRI AUTOMATIQUE : Les plus gros % en premier
        matchs.sort((a, b) => b.scoreProno - a.scoreProno);

        conteneur.innerHTML = "";

        matchs.forEach(m => {
            const card = `
                <div class="stat-card">
                    <div class="info-equipe">
                        <b class="nom-equipe">${m.domicile}</b><br>
                        <small>${m.ligue}</small>
                    </div>
                    <div class="analyse">
                        <span style="font-size: 0.8rem; color: #666;">Fiabilité ${categorie}</span>
                        <div class="pourcentage">${m.scoreProno}%</div>
                    </div>
                </div>
            `;
            conteneur.innerHTML += card;
        });
    } catch (error) {
        conteneur.innerHTML = "<p class='loader'>Erreur de chargement. Vérifie ton quota API.</p>";
    }
}

// FONCTION DE RECHERCHE INTELLIGENTE (Nom ou %)
function filtrerTout() {
    const saisie = document.getElementById('searchInput').value.toLowerCase();
    const cartes = document.querySelectorAll('.stat-card');

    cartes.forEach(carte => {
        const nomEquipe = carte.querySelector('.nom-equipe').innerText.toLowerCase();
        const pourcentageTexte = carte.querySelector('.pourcentage').innerText; // Récupère "95%"
        const pourcentageChiffre = parseInt(pourcentageTexte); // Transforme en nombre 95

        // Si la saisie est un nombre, on filtre par %
        if (!isNaN(saisie) && saisie !== "") {
            const seuil = parseInt(saisie);
            if (pourcentageChiffre >= seuil) {
                carte.style.display = "flex";
            } else {
                carte.style.display = "none";
            }
        } 
        // Sinon, on filtre par nom d'équipe
        else {
            if (nomEquipe.includes(saisie)) {
                carte.style.display = "flex";
            } else {
                carte.style.display = "none";
            }
        }
    });
}

function changerOnglet(type) {
    // Reset de la barre de recherche quand on change d'onglet
    document.getElementById('searchInput').value = "";
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    chargerPredictions(type);
}

// Lancement automatique
chargerPredictions('buts');
