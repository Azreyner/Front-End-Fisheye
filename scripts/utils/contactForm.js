const main = document.querySelector("main")
const listeImage = document.querySelector(".listeImage")
const triage = document.querySelector(".triage");
const modal = document.getElementById("contact_modal");

/* eslint-disable-no-unused-vars indent */
function displayModal() {
    main.setAttribute("aria-hidden", "true")
    listeImage.setAttribute("aria-hidden", "true")
    triage.setAttribute("aria-hidden", "true")
    modal.setAttribute("aria-hidden", "false")
	modal.style.display = "block";
    document.getElementById("prenom").focus();
}
/* eslint-enable-no-unused-vars indent */

function closeModal() {
    main.setAttribute("aria-hidden", "false")
    listeImage.setAttribute("aria-hidden", "false")
    triage.setAttribute("aria-hidden", "false")
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true")
}

function sendModal(e){
    console.log("test send")
    e.preventDefault();
    fetch("https://mockbin.com/request", {
        method: "POST",
        headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({Prénom: document.getElementById("prenom").value, Nom : document.getElementById("nom").value, Mail : document.getElementById("mail").value, Message : document.getElementById("message").value})
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value.postData.text);
    });

}

document.getElementById("form").addEventListener("submit", sendModal);

document.addEventListener('keydown', function(event){
	if(event.key === "Escape" && modal.getAttribute('aria-hidden') === 'false'){
		closeModal()
	}
});