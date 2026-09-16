// Recuperer les infos de ces elements avec getElementById
const formulaire = document.getElementById("produitForm")

const nom = document.getElementById("nom");
const categorie = document.getElementById("categorie");
const prixAchat = document.getElementById("prix_achat");
const prixVente = document.getElementById("prix_vente");
const quantite = document.getElementById("quantite");
const stockMinimum = document.getElementById("stock");

formulaire.addEventListener("submit", function(event) {
    event.preventDefault();  
    //Affichage des valeurs dans le console
    console.log(nom.value);
    console.log(categorie.value);
    console.log(prixAchat.value);
    console.log(prixVente.value);
    console.log(quantite.value);
    console.log(stockMinimum.value);

    const tabo = document.getElementById("produitsTableBody")
    const ligne = document.createElement("tr")
    const cellule1 = document.createElement("td")
    cellule1.textContent = 1
   
    const cellule2 = document.createElement("td")
    cellule2.textContent = nom.value

    const cellule3 = document.createElement("td")
    cellule3.textContent = categorie.value

    const cellule4 = document.createElement("td")
    cellule4.textContent = prixAchat.value

    const cellule5 = document.createElement("td")
    cellule5.textContent = prixVente.value

    const cellule6 = document.createElement("td")
    cellule6.textContent = quantite.value

    const cellule7 = document.createElement("td")
    cellule7.textContent = stockMinimum.value

    const cellule8 = document.createElement("td")
    cellule8.textContent = "En stock"

    const cellule9 = document.createElement("td")
    //Creation du bouton modifier
    const btnModifier = document.createElement("button")
    btnModifier.textContent = "Modifier"
    btnModifier.classList.add("btn-modifier")
    //Creation du bouton supprimer
    const btnSupprimer = document.createElement("button")
    btnSupprimer.textContent = "Supprimer"
    btnSupprimer.classList.add("btn-supprimer")

    //Affichage des deux bouton dans la cellul 9
    cellule9.appendChild(btnModifier)
    cellule9.appendChild(btnSupprimer)


    // Condition pour verifier l'etat du staut de chaque produit
    if(Number(quantite.value) === 0) {
        cellule8.textContent = "Rupture"
    }else if(Number(quantite.value) <= Number(stockMinimum.value)) {
        cellule8.textContent = "Stock faible"
    }else {
        cellule8.textContent = "En stock"
    }
    /* Ajouter chaque cellule creer dans la ligne */
    ligne.appendChild(cellule1)
    ligne.appendChild(cellule2)
    ligne.appendChild(cellule3)
    ligne.appendChild(cellule4)
    ligne.appendChild(cellule5)
    ligne.appendChild(cellule6)
    ligne.appendChild(cellule7)
    ligne.appendChild(cellule8)
    ligne.appendChild(cellule9)

    /*Afficher un produit dans le tableau*/
    tabo.appendChild(ligne)

//Supprimer un produit 
 btnSupprimer.addEventListener("click", function(){
        btnSupprimer.parentElement.parentElement.remove()
    });

// Modifier un produit
btnModifier.addEventListener("click", function(){
    const ligne = btnModifier.parentElement.parentElement

    nom.value = ligne.cells[1].textContent
    categorie.value = ligne.cells[2].textContent
    prixAchat.value = ligne.cells[3].textContent
    prixVente.value = ligne.cells[4].textContent
    quantite.value = ligne.cells[5].textContent
    stockMinimum.value = ligne.cells[6].textContent



});
});



   
    