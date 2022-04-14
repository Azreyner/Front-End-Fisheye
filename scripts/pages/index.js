    async function getPhotographers() {
    
        const tabPhotographers = [];

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


        console.log(result);
        console.log("le tableau : ", tabPhotographers)
        // et bien retourner le tableau photographers seulement une fois
        return result;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        console.log("photographers depuis display data : ", photographers);
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const data = await getPhotographers();
        console.log("Test data init : ", data)
        displayData(data);
    };
    
    init();
    