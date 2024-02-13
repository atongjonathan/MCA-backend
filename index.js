const nav_hamburger_menu = document.querySelector(".nav_hamburger_menu");


nav_hamburger_menu.addEventListener('click', ()=>{
    const nav_active = document.querySelector(".nav_active");
    nav_active.classList.toggle("n_active");
    console.log('clicked');
    console.log(nav_active);
})