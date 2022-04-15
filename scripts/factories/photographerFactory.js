function photographerFactory(data) {
    const { name, portrait, price, tagline, city, country, id } = data;
    //console.log("test const data : ", data);
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        
        // Création d'élement
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' )
        const divText = document.createElement('div');
        const pVillePays = document.createElement('p');
        const pTagline = document.createElement('p');
        const pPrix = document.createElement('p');

        //Set attribute 
        link.setAttribute("href", window.location.origin + "/photographer.html" + "?id=" + id);
        img.setAttribute("src", picture)
        img.setAttribute("alt", "")
        pVillePays.setAttribute("class", "villePays")
        pTagline.setAttribute("class", "tagline")
        pPrix.setAttribute("class", "prix")
        
        h2.textContent = name;
        pVillePays.textContent = city + ', ' + country;
        pTagline.textContent = tagline;
        pPrix.textContent = price + '€/jour';

        // place les éléments

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        divText.appendChild(pVillePays);
        divText.appendChild(pTagline);
        divText.appendChild(pPrix);
        article.appendChild(divText);
        
        return (article);
    }
    return { name, portrait, price, tagline, city, country, id, picture, getUserCardDOM }
}