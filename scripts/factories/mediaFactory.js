function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, price, date } = data;
    //console.log("test const data : ", data);
    let mediaLink;
    const heartLink = "assets/icons/heart.svg"

    function getMediaCardDOM() {
        
        // Création d'élement
        const divImage = document.createElement('div');
        let media;
        if(!image){
            media = document.createElement( 'video' );
            mediaLink = `assets/images/${video}`;
        }else{
            media = document.createElement( 'img' );
            mediaLink = `assets/images/${image}`
        }
        const infos  = document.createElement('div');
        const textTitre = document.createElement( 'p' );
        const like = document.createElement( 'p' );
        const heartPNG = document.createElement('img');
        const blocLike = document.createElement('div');

        textTitre.textContent = title;
        like.textContent = likes;

        //Set attribute
        divImage.setAttribute("class", "unMedia")
        media.setAttribute("src", mediaLink)
        media.setAttribute("class", "imagePhotographer")
        media.setAttribute("alt", title)
        media.setAttribute("onclick", "displayLightbox(this.id)")
        media.setAttribute("id", id)
        textTitre.setAttribute("class", "titreImage")
        blocLike.setAttribute("class", "blocLike")
        like.setAttribute("class", "nbLike")
        infos.setAttribute("class", "lesInfos")
        heartPNG.setAttribute("alt", "likes")
        heartPNG.setAttribute("src", heartLink)

        // place les éléments
        divImage.appendChild(media);
        infos.appendChild(textTitre);
        infos.appendChild(blocLike);
        blocLike.appendChild(like)
        blocLike.appendChild(heartPNG)
        divImage.appendChild(infos)
        
        return (divImage);
    }
    return { id, photographerId, title, image, likes, price, date, getMediaCardDOM }
}