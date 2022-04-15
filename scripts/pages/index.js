    async function getPhotographers() {

        const result = await fetch('../../data/photographers.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP erreur " + response.status);
                }
                return response.json();
            })
            .then(data => {
                return data.photographers;
            })
            .catch(function () {
                this.dataError = true;
            })

        // et bien retourner le tableau photographers seulement une fois
        return result;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

            // Ici on stock chaque photographe créé par la factory dans le storage.
            localStorage.setItem(photographerModel.id, JSON.stringify(photographerModel));
            
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const data = await getPhotographers();
        console.log(data)
        displayData(data);
    };
    
    init();
    