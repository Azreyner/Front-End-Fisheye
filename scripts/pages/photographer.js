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
    // et bien retourner le tableau photographers seulement une fois
    

    result.forEach(unMedia => { 
        if(unMedia['photographerId'] === id){
            tableauMedia.push(unMedia);
        }
    });

    return tableauMedia;
}

function getTotalLike(lesMedias){
    lesMedias.forEach((leMedia) => {
        nbLiketotal += leMedia.likes;
    });
}

async function displayData(lesMedia) {
    const listeImage = document.querySelector(".listeImage");
    //listeImage.setAttribute("aria-label", "Liste d'image")
    //listeImage.setAttribute("aria-labelledby", "Liste d'image")$
    let i = 1;
    lesMedia.forEach((leMedia) => {
        
        const leMediaModel = mediaFactory(leMedia, i);
        const leMediaDom = leMediaModel.getMediaCardDOM();
        
        i = i + 1;
        listeImage.appendChild(leMediaDom);
        
    });

}

async function init() {
    
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));

    const photographe = JSON.parse(localStorage.getItem(id));

    profil(photographe);

    //on récupère tous les médias du photographe
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

function clickTrieur(){
    currentOption = trieur.value;
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
            console.log('Mangoes and papayas are $2.79 a pound.');
            // expected output: "Mangoes and papayas are $2.79 a pound."
            break;
        default:
            console.log("Erreur trieur vide.");
      }
}

let lesMedias = [];
let nbLiketotal = 0;
let currentOption = "Popularité"


const prixJour = document.querySelector(".likeGlobal p");
const trieur = document.getElementById("trieur")

init();