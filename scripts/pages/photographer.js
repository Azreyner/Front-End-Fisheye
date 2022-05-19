//ici on construit la partie "profil" du photographe
function profil(photographe){
    const infoPhotographe = document.querySelector(".infoPhotographe");
    const photographeHeader = document.querySelector(".photograph-header");
    const photographePrix = document.querySelector(".infoComplementaire .prix")

    const nom = document.createElement('h1');
    const villeCountry = document.createElement('span');
    const tagline = document.createElement('span');
    const infos = document.createElement('p');
    const image = document.createElement('img');

    nom.textContent = photographe.name;
    villeCountry.textContent = photographe.city + ", " + photographe.country;
    tagline.textContent = photographe.tagline;
    photographePrix.textContent = photographe.price+ "€ / jour"

    image.setAttribute("src", photographe.picture)
    image.setAttribute("alt", photographe.name)
    villeCountry.setAttribute("class", "villePays");
    tagline.setAttribute("class", "tagline");

    infos.appendChild(villeCountry);
    infos.appendChild(tagline);

    infoPhotographe.appendChild(nom);
    infoPhotographe.appendChild(infos)
    photographeHeader.appendChild(image);
}

//ici on retourne donc un tableau d'images et de photos (seulement les medias qui sont liés à l'ID du photographe) 
async function getMedia(id) {

    let tableauMedia = [];

    let result = await fetch('../../data/photographers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP erreur " + response.status);
            }
            return response.json();
        })
        .then(data => {
            
            return data.media;
        })
        .catch(function () {
            this.dataError = true;
        })
    

    result.forEach(unMedia => { 
        if(unMedia['photographerId'] === id){
            tableauMedia.push(unMedia);
        }
    });

    return tableauMedia;
}

//calcule le nombre total de like qu'a reçu un photographe
function getTotalLike(lesMedias){
    lesMedias.forEach((leMedia) => {
        nbLiketotal += leMedia.likes;
    });
}


//On affiche la liste d'images et de vidéos
async function displayData(lesMedia) {
    const listeImage = document.querySelector(".listeImage");
    //listeImage.setAttribute("aria-label", "Liste d'image")
    //listeImage.setAttribute("aria-labelledby", "Liste d'image")$
    let i = 1;
    lesMedia.forEach((leMedia) => {
        
        const leMediaModel = mediaFactory(leMedia, i);
        const leMediaDom = leMediaModel.getMediaCardDOM();
        
        //ici on incrémente une valeur qui va servir à incrémenter l'index du "tabindex"
        i = i + 1;
        listeImage.appendChild(leMediaDom);
        
    });

}

async function init() {

    //on récupère les paramètres dans l'URL la page, ici on veut récupérer l'ID du photographe
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));

    //grâce à l'ID dans la barre URL on récupère le photogrpahe contenu dans le local storage 
    const photographe = JSON.parse(localStorage.getItem(id));

    //on créé le photographe grâce à l'ID récupéré juste au-dessus
    profil(photographe);

    //on récupère tous les médias du photographe grâce à son id
    lesMedias = await getMedia(id);

    //met à jours le nombre de total de like
    getTotalLike(lesMedias);
    
    prixJour.innerText = nbLiketotal;

    //tirage des photos et vidéos puis affichage
    lesMedias.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
    displayData(lesMedias);


    //récupération des blocs "nombre de like"
    const blocsLike = document.querySelectorAll(".blocLike")
    //On ajoute un eventListener sur tout ces blocs
    blocsLike.forEach((leBloc) => {
        leBloc.addEventListener("onchange", () => delLike(leBloc))
    })

}


//quand on change la valeur du select cette fonction se lance
function clickTrieur(){
    currentOption = trieur.value;
    //on appelle la fonction qui va trier la liste d'image
    majListeImage();
}

//permet de trier la liste d'images/vidéo
function majListeImage(){
    listeImage.innerHTML = '';
    console.log(currentOption)
    switch (currentOption) {
        case 'popularité':
            lesMedias.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
            displayData(lesMedias)
            break;
        case 'date':
            lesMedias.sort((a, b) => (a.date < b.date) ? 1 : -1)
            displayData(lesMedias)
            break;
        case 'titre':
            lesMedias.sort((a, b) => (a.title > b.title) ? 1 : -1)
            displayData(lesMedias)
            break;
        default:
            console.log("Erreur trieur vide.");
      }
}

//On initialise les variables qui vont servir sur la page du photographe : le tableau de photos/vidéo, les likes totaux, l'option de trie des medias...
let lesMedias = [];
let nbLiketotal = 0;
let currentOption = "Popularité"


const prixJour = document.querySelector(".likeGlobal p");
const trieur = document.getElementById("trieur")

init();