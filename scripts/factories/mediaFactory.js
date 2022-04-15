function mediaFactory(data) {
    const { id, photographerId, title, image, likes, price, date } = data;
    //console.log("test const data : ", data);
    const picture = `assets/images/${image}`;
    const heartLink = "assets/icons/heart.png"

    function getMediaCardDOM() {
        
        // Création d'élement
        const divImage = document.createElement('div');
        const pic = document.createElement( 'img' );
        const infos  = document.createElement('div');
        const textTitre = document.createElement( 'p' );
        const like = document.createElement( 'p' );
        const heartPNG = document.createElement('img');

        textTitre.textContent = title;
        like.textContent = likes;

        //Set attribute
        divImage.setAttribute("class", "unMedia")
        pic.setAttribute("src", picture)
        pic.setAttribute("class", "imagePhotographer")
        textTitre.setAttribute("class", "titreImage")
        like.setAttribute("class", "nbLike")
        infos.setAttribute("class", "lesInfos")
        heartPNG.setAttribute("alt", "likes")
        heartPNG.setAttribute("src", heartLink)

        // place les éléments
        divImage.appendChild(pic);
        infos.appendChild(textTitre);
        infos.appendChild(like);
        infos.appendChild(heartPNG)
        divImage.appendChild(infos)
        
        return (divImage);
    }
    return { id, photographerId, title, image, likes, price, date, getMediaCardDOM }
}