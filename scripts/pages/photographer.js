function profil(photographe){
    const infoPhotographe = document.querySelector(".infoPhotographe");
    const photographeHeader = document.querySelector(".photograph-header");

    const nom = document.createElement('h1');
    const villeCountry = document.createElement('span');
    const tagline = document.createElement('span');
    const infos = document.createElement('p');
    const image = document.createElement('img');

    nom.textContent = photographe.name;
    villeCountry.textContent = photographe.city + ", " + photographe.country;
    tagline.textContent = photographe.tagline;

    image.setAttribute("src", photographe.picture)
    villeCountry.setAttribute("class", "villePays");
    tagline.setAttribute("class", "tagline");

    infos.appendChild(villeCountry);
    infos.appendChild(tagline);

    infoPhotographe.appendChild(nom);
    infoPhotographe.appendChild(infos)
    photographeHeader.appendChild(image);
}

async function getMedia(id) {

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
    

    //console.log("test ", result)

    result.forEach(unMedia => { 
        if(unMedia['photographerId'] != id){
            //console.log(unMedia['photographerId'], result.indexOf(unMedia))
            result.splice(result.indexOf(unMedia), 1);
            //console.log(result);    
        }
    });

    return result;
}

async function displayData(lesMedia) {
    const listeImage = document.querySelector(".listeImage");

    lesMedia.forEach((leMedia) => {
        console.log(leMedia)
        const leMediaModel = mediaFactory(leMedia);
        const leMediaDom = leMediaModel.getMediaCardDOM();
        

        listeImage.appendChild(leMediaDom);
    });

};

async function init() {
    
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get('id'));

    const photographe = JSON.parse(localStorage.getItem(id));

    profil(photographe);

    const lesMedia = await getMedia(id);

    console.log("La liste de photo de", photographe.name, ":", lesMedia);

    displayData(lesMedia);

};

init();