// --- 🎥 GESTION DES VIDÉOS POPUP (MODAL) ---
function ouvrirModal(url) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    
    // Injecte le lien Google Drive
    player.src = url;
    // Affiche le popup
    modal.style.display = "block";
    // Empêche le défilement de la page derrière
    document.body.style.overflow = "hidden";
}

function fermerModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    
    // Cache le popup
    modal.style.display = "none";
    // Vide la source pour arrêter la vidéo (couper le son)
    player.src = ""; 
    // Réactive le défilement de la page
    document.body.style.overflow = "auto";
}

// Ferme le popup si on clique n'importe où sur l'écran noir
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        fermerModal();
    }
}


// --- ❓ GESTION DE LA FAQ (ACCORDÉON) ---
function toggleFaq(element) {
    // Récupère le bloc parent (.faq-item)
    const item = element.parentElement;
    const answer = item.querySelector('.faq-answer');

    // Si la question est déjà ouverte, on la ferme
    if (item.classList.contains('active')) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
    } else {
        // Optionnel : Ferme les autres questions ouvertes pour faire plus propre
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Ouvre la question cliquée
        item.classList.add('active');
        // Définit la hauteur maximum en fonction du contenu réel
        answer.style.maxHeight = answer.scrollHeight + "px"; 
    }
}