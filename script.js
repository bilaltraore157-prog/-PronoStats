// --- 🎥 GESTION DES VIDÉOS POPUP (MODAL) ---
function ouvrirModal(url) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    player.src = url;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function fermerModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    modal.style.display = "none";
    player.src = ""; 
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        fermerModal();
    }
}

// --- ❓ GESTION DE LA FAQ (ACCORDÉON) ---
function toggleFaq(element) {
    const item = element.parentElement;
    const answer = item.querySelector('.faq-answer');

    if (item.classList.contains('active')) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
    } else {
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px"; 
    }
}

// --- 🌟 ACTION DU BOUTON COLLANT DU BAS ---
function allerAuPaiement() {
    const sectionPaiement = document.getElementById('paiement-section');
    sectionPaiement.scrollIntoView({ behavior: 'smooth' });
}