function mediaFactory(data, index) {
    const { id, photographerId, title, image, video, likes, price, date } = data;
    //console.log("test const data : ", data);
    let mediaLink;
    const heartLink = "assets/icons/heart.svg"

    function getMediaCardDOM() {

        //ajouter un like
        function addLike(){
            console.log("erzer")
            let likeUneImage = blocLike.firstChild.innerHTML;
            likeUneImage++;

            blocLike.firstChild.innerText = likeUneImage++;

            nbLiketotal++;
            prixJour.innerText = nbLiketotal;

            blocLike.removeEventListener("click", addLike, true)
        }

        function verifKey(){
            if (e.key === 'Enter' || e.keyCode === 13) {
                // Do something
            }
        }
        
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
        //divImage.setAttribute("aria-label", title)
        divImage.setAttribute("role", "listitem")
        divImage.setAttribute("tabindex", index)
        media.setAttribute("src", mediaLink)
        media.setAttribute("class", "imagePhotographer")
        
        //c'est grâce à ces deux attributs que la fonction "displayLightbox" dans mediaFactory.js marche
        media.setAttribute("onclick", "displayLightbox(this.id)")
        media.setAttribute("id", id)

        media.setAttribute("alt", "")
        textTitre.setAttribute("class", "titreImage")
        blocLike.setAttribute("class", "blocLike")
        //blocLike.setAttribute("id", i++)
        like.setAttribute("class", "nbLike")
        infos.setAttribute("class", "lesInfos")
        heartPNG.setAttribute("alt", "likes")
        heartPNG.setAttribute("src", heartLink)

        divImage.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
              displayLightbox(media.id)
            }
        });

        // place les éléments
        divImage.appendChild(media);
        infos.appendChild(textTitre);
        infos.appendChild(blocLike);
        blocLike.appendChild(like)
        blocLike.appendChild(heartPNG)
        blocLike.addEventListener("click", addLike, true)
        /*blocLike.addEventListener('click', function() {
            let likeUneImage = blocLike.firstChild.innerHTML;
            likeUneImage++;

            blocLike.firstChild.innerText = likeUneImage++;

            // this fait référence à l'élément HTML "block like"
            this.removeEventListener('click', arguments.callee);
        });*/
        divImage.appendChild(infos)

        return (divImage);
    }

    return { id, photographerId, title, image, likes, price, date, getMediaCardDOM }
}