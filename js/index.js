
document.addEventListener("DOMContentLoaded", ()=>
{
    const sections = document.querySelectorAll("section")
    const index = document.getElementById("index")
    function scrollToElement(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }


      function navigateTo() {
        const index_sections = ["service", "about", "contact"];
        const hash = window.location.hash.substring(1); // Remove the "#" from the hash
    
        sections.forEach((section) => {
            const sectionId = section.id;
    
            if (!index_sections.includes(sectionId)) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block'; // Show the section
                if (sectionId === hash) {
                    scrollToElement(section); // Scroll to the section
                }
            }
        });
    
        if (hash.includes("/")) {
            const id = hash.replace("/", "");
            const targetSection = document.getElementById(id);
            if (targetSection) {
                targetSection.style.display = "block";
                scrollToElement(targetSection);
            }
        } else {
            console.log(hash);
            // Assuming index is the default section to show if no hash or invalid hash is provided
            index.style.display = 'block';
            scrollToElement(index);
        }
    }
    
    // Call the function initially to handle the page load
    navigateTo();
    
    // Event listener for hashchange
    window.addEventListener('hashchange', navigateTo);
    




    const nav_hamburger_menu = document.querySelector(".nav_hamburger_menu");


    nav_hamburger_menu.addEventListener('click', ()=>{
        const nav_active = document.querySelector(".nav_active");
        nav_active.classList.toggle("n_active");
        console.log('clicked');
        console.log(nav_active);
    })
    if (localStorage.getItem("User"))
    {
        const signInBtn = document.getElementById("signin_btn")
        console.log("Is logged in")
        // const register_btn = document.getElementsByClassName("register_btn")
        // signInBtn.innerText = "Log Out"
        // register_btn.style.display = "none"
        // signInBtn.style.backgroundColor = "yellow"
        
    }

//  load content based on the hash value

      
      
})
