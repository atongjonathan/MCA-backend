
document.addEventListener("DOMContentLoaded", ()=>
{
    const sections = document.querySelectorAll("section")
    const index = document.getElementById("main")
    function scrollToElement(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }


      function scrollToElement(targetElement) {
        $('html, body').animate({
          scrollTop: targetElement.offset().top
        }, 800);
      }
  
      // Function to handle hashchange and toggle visibility
      function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove the "#" from the hash
  
        if (hash.includes("/")) {
          const id = hash.replace("/", "");
          const targetSection = $('#' + id);
  
          if (targetSection.length) {
            // Hide all sections and show the target section
            $('section').hide();
            targetSection.show();
            scrollToElement(targetSection);
          }
        } else if (!hash.includes("contact")){
          // Show default section (assuming it has an ID of "index")
        //   const targetSection = $(hash);
          $('section').hide();
          $("#main").show();
        }
      }
  
      // Call the function initially to handle the page load
      handleHashChange();
  
      // Event listener for hashchange
      $(window).on('hashchange', handleHashChange);
    




    const nav_hamburger_menu = document.querySelector(".nav_hamburger_menu");


    nav_hamburger_menu.addEventListener('click', ()=>{
        const nav_active = document.querySelector(".nav_active");
        nav_active.classList.toggle("n_active");
        // console.log(nav_active);
    })
    let data = localStorage.getItem("UserToken");


    let loginBtns = document.querySelectorAll(".login_btn");
    
    loginBtns.forEach((btn) => {
      if (data) {
        btn.innerText = "Logout"; // Change button text to Login
        // console.log(btn.innerText)
    } else {
        // User is logged out, redirect to login page
        btn.innerText = "Login";
      
      }


        btn.addEventListener("click", () => {
            if (data) {
                // User is logged in, perform logout
                localStorage.removeItem("UserToken");
                data = null; // Update data variable
                // console.log("Logout", btn)
                alert("You have logged out")
                btn.innerText = "Login"; // Change button text to Login
            } else {
                // User is logged out, redirect to login page
                window.location = "#/login";
            }
        });
    });
    
    
        let loggedin = document.getElementById("login")
        loggedin.style.display = "none"
        // signInBtn.innerText = "Log Out"
        // register_btn.style.display = "none"
        // signInBtn.style.backgroundColor = "yellow"
        
    

//  load content based on the hash value

      
      let loginForm = document.getElementById("logins")
      loginForm.addEventListener("submit", (e)=>
      {
        e.preventDefault()
        let email = document.getElementById("email").value

        let password = document.getElementById("password").value

        let data = {}
        for (let element of loginForm.elements)
        {
            data[element.name] = element.value;
        }
        fetch("https://229e-102-23-139-23.ngrok-free.app/login",
                {
                method: "POST",
                headers:{
                    "Content-Type":"application/json" // To specify the type of data we want to send. Normally testing client does this automatically
                },
                body:JSON.stringify(data)
            }
                )
            .then((response)=>response.json())
            .then((data)=>
            {
               if (data.token)
               {
                localStorage.setItem("UserToken", data.token)
                let passwordInput = loginForm.querySelector('input[type="password"]');
                console.log(passwordInput)

                for (let element of loginForm.elements)
                {
                    if (element.name == "email")
                    {
                      var email = element
                    }
                    else if(element.id == "password")
                    {
                      var passw = passwordInput
                    }
                    console.log(email, passw)
                    let passwordInput = loginForm.querySelector('input[type="password"]');
                    email.classList.add("is-valid")
                    passwordInput.classList.add("is-valid")
                    window.location = "./index.html"
                    setInterval(1)
                    alert("You have Logged In")
                

                
                let loginBtns = document.querySelectorAll(".login_btn");
    
                loginBtns.forEach((btn) => {

                  btn.innerText = "Log Out"
                })
                window.location = "./index.html"
                
                
               }
              }
               else
               {
                for (let element of loginForm.elements)
                {
                    if (element.name == "email")
                    {
                      var email = element
                    }
                    else if(element.name == "password")
                    {
                      var password = element
                    }
                }
                let message = data.message
                    
                    if (message == "Wrong email") {
                      email.classList.remove("is-valid");
                      email.classList.add("is-invalid");
                    } else {
                      email.classList.remove("is-invalid");
                      password.classList.remove("is-valid");
                      password.classList.add("is-invalid");
                    }
               }
      })
    })
})
