const conteneur = document.querySelector("#liste-fiches");
const zoneFiltres = document.querySelector("#filtres");

// Fabrique une carte HTML pour une fiche donnée.
function creerCarte(fiche) {
  const carte = document.createElement("article");
  carte.className = "fiche";
  carte.innerHTML = `
    <span class="fiche__categorie">${fiche.categorie}</span>
    <h2 class="fiche__titre">${fiche.titre}</h2>
    <p class="fiche__texte">${fiche.texte}</p>
    <p class="fiche__auteur">${fiche.auteur}</p>
  `;
  return carte;
}

// Affiche les fiches d'une catégorie ("Toutes" les affiche toutes).
function afficher(categorie) {
  conteneur.innerHTML = "";

  FICHES.forEach(function (fiche) {
    if (categorie === "Toutes" || fiche.categorie === categorie) {
      conteneur.appendChild(creerCarte(fiche));
    }
  });
}

// Construit la liste des boutons à partir des catégories existantes.
const categories = ["Toutes"];
FICHES.forEach(function (fiche) {
  if (categories.indexOf(fiche.categorie) === -1) {
    categories.push(fiche.categorie);
  }
});

categories.forEach(function (categorie) {
  const bouton = document.createElement("button");
  bouton.className = "filtre";
  bouton.textContent = categorie;

  bouton.addEventListener("click", function () {
    document.querySelectorAll(".filtre").forEach(function (b) {
      b.classList.remove("filtre--actif");
    });
    bouton.classList.add("filtre--actif");
    afficher(categorie);
  });

  zoneFiltres.appendChild(bouton);
});

// Au chargement, on affiche tout et on active le premier bouton.
afficher("Toutes");
document.querySelector(".filtre").classList.add("filtre--actif");

const compteur = document.querySelector("#compteur");
compteur.textContent = FICHES.length + " fiches dans le guide";