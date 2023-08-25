let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

/* typewriter effect with alterating text */
var typed = new Typed(".auto-type", {
    strings: ["Web Developer.", "Computer Science student.", "Trojan."],
    typeSpeed: 150,
    backSpeed: 100,
    loop: true
})