// Recuperer les infos de ces elements avec getElementById
const formulaire = document.getElementById("produitForm")

const nom = document.getElementById("nom");
const categorie = document.getElementById("categorie");
const prixAchat = document.getElementById("prix_achat");
const prixVente = document.getElementById("prix_vente");
const quantite = document.getElementById("quantite");
const stockMinimum = document.getElementById("stock");
const recherche = document.getElementById("recherche");
const btnSubmit = formulaire.querySelector("button[type='submit']");
const btnAnnuler = document.getElementById("btnAnnuler");

let ligneEnModification = null;
let prochainId = 1; // compteur d'ID auto-incrémenté

// Retourne {classe, texte} du badge selon quantité / stock minimum
function calculerStatut(qte, stockMin) {
    if (Number(qte) === 0) {
        return { classe: "badge-out", texte: "Rupture" };
    } else if (Number(qte) <= Number(stockMin)) {
        return { classe: "badge-low", texte: "Stock faible" };
    } else {
        return { classe: "badge-instock", texte: "En stock" };
    }
}

// Construit le <span> badge de statut
function creerBadgeStatut(qte, stockMin) {
    const { classe, texte } = calculerStatut(qte, stockMin);
    const badge = document.createElement("span");
    badge.classList.add("badge", classe);
    badge.textContent = texte;
    return badge;
}

// Annule le mode modification et remet le formulaire à l'état "ajout"
function annulerModification() {
    ligneEnModification = null;
    formulaire.reset();
    btnSubmit.textContent = "Ajouter le produit";
    btnAnnuler.hidden = true;
}

btnAnnuler.addEventListener("click", annulerModification);
let produits;
const produitStockes =  localStorage.getItem("produits")

if(produitStockes !== null ) {  
       produits = JSON.parse(produitStockes)
    }else {
        produits = []
    }
formulaire.addEventListener("submit", function(event) {
    event.preventDefault();

    const produit = {
    id: prochainId,
    nom: nom.value,
    categorie: categorie.value,
    prixAchat: Number(prixAchat.value),
    prixVente: Number(prixVente.value),
    quantite: quantite.value,
    stockMinimum: stockMinimum.value
};
    produits.push(produit)
    localStorage.setItem("produits", JSON.stringify(produits));

    const tabo = document.getElementById("produitsTableBody");
    let ligne;

    if (ligneEnModification === null) {
        // --- Ajout d'un nouveau produit ---
        ligne = document.createElement("tr");

        const cellule1 = document.createElement("td");
        cellule1.textContent = prochainId;
        ligne.dataset.id = prochainId;
        prochainId++;

        const cellule2 = document.createElement("td");
        cellule2.textContent = nom.value;

        const cellule3 = document.createElement("td");
        cellule3.textContent = categorie.value;

        const cellule4 = document.createElement("td");
        cellule4.textContent = prixAchat.value;

        const cellule5 = document.createElement("td");
        cellule5.textContent = prixVente.value;

        const cellule6 = document.createElement("td");
        cellule6.textContent = quantite.value;

        const cellule7 = document.createElement("td");
        cellule7.textContent = stockMinimum.value;

        const cellule8 = document.createElement("td");
        cellule8.appendChild(creerBadgeStatut(quantite.value, stockMinimum.value));

        const cellule9 = document.createElement("td");
        cellule9.classList.add("actions-cell");

        // Creation du bouton modifier
        const btnModifier = document.createElement("button");
        btnModifier.textContent = "Modifier";
        btnModifier.classList.add("btn-modifier");
        btnModifier.setAttribute("aria-label", "Modifier " + nom.value);

        // Creation du bouton supprimer
        const btnSupprimer = document.createElement("button");
        btnSupprimer.textContent = "Supprimer";
        btnSupprimer.classList.add("btn-supprimer");
        btnSupprimer.setAttribute("aria-label", "Supprimer " + nom.value);

        cellule9.appendChild(btnModifier);
        cellule9.appendChild(btnSupprimer);

        // Supprimer un produit
        btnSupprimer.addEventListener("click", function() {
            const ligneASupprimer = btnSupprimer.closest("tr");
            // si on supprime la ligne en cours de modification, on annule proprement
            if (ligneEnModification === ligneASupprimer) {
                annulerModification();
            }
            ligneASupprimer.remove();
        });

        // Modifier un produit
        btnModifier.addEventListener("click", function() {
            const ligneCliquee = btnModifier.closest("tr");
            ligneEnModification = ligneCliquee;

            nom.value = ligneCliquee.cells[1].textContent;
            categorie.value = ligneCliquee.cells[2].textContent;
            prixAchat.value = ligneCliquee.cells[3].textContent;
            prixVente.value = ligneCliquee.cells[4].textContent;
            quantite.value = ligneCliquee.cells[5].textContent;
            stockMinimum.value = ligneCliquee.cells[6].textContent;

            btnSubmit.textContent = "Enregistrer les modifications";
            btnAnnuler.hidden = false;
            nom.focus();
        });

        ligne.appendChild(cellule1);
        ligne.appendChild(cellule2);
        ligne.appendChild(cellule3);
        ligne.appendChild(cellule4);
        ligne.appendChild(cellule5);
        ligne.appendChild(cellule6);
        ligne.appendChild(cellule7);
        ligne.appendChild(cellule8);
        ligne.appendChild(cellule9);

        tabo.appendChild(ligne);
        formulaire.reset();

    } else {
        // --- Modification d'un produit existant ---
        ligne = ligneEnModification;

        ligne.cells[1].textContent = nom.value;
        ligne.cells[2].textContent = categorie.value;
        ligne.cells[3].textContent = prixAchat.value;
        ligne.cells[4].textContent = prixVente.value;
        ligne.cells[5].textContent = quantite.value;
        ligne.cells[6].textContent = stockMinimum.value;

        // Mise à jour du badge de statut
        ligne.cells[7].innerHTML = "";
        ligne.cells[7].appendChild(creerBadgeStatut(quantite.value, stockMinimum.value));

        // Mise à jour des aria-label des boutons avec le nouveau nom
        const btnModifierLigne = ligne.querySelector(".btn-modifier");
        const btnSupprimerLigne = ligne.querySelector(".btn-supprimer");
        if (btnModifierLigne) btnModifierLigne.setAttribute("aria-label", "Modifier " + nom.value);
        if (btnSupprimerLigne) btnSupprimerLigne.setAttribute("aria-label", "Supprimer " + nom.value);

        annulerModification();
    }
});

// --- Recherche en direct dans le tableau ---
recherche.addEventListener("input", function() {
    const termeRecherche = recherche.value.trim().toLowerCase();
    const lignes = document.querySelectorAll("#produitsTableBody tr");

    lignes.forEach(function(ligneProduit) {
        const nomProduit = ligneProduit.cells[1].textContent.toLowerCase();
        const categorieProduit = ligneProduit.cells[2].textContent.toLowerCase();
        const correspond = nomProduit.includes(termeRecherche) || categorieProduit.includes(termeRecherche);
        ligneProduit.style.display = correspond ? "" : "none";
    });
});