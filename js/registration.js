addEventListener("DOMContentLoaded", (event) => {
    let form = document.getElementById('form');
    let submitBtn = document.getElementById('submitBtn');
    let currentData = {};


    // Validation

    const password = document.getElementById("password-input");
    const passwordAlert = document.getElementById("password-alert");
    const requirements = document.querySelectorAll(".requirements");
    const leng = document.querySelector(".leng");
    const bigLetter = document.querySelector(".big-letter");
    const num = document.querySelector(".num");
    const specialChar = document.querySelector(".special-char");

    requirements.forEach((element) => element.classList.add("wrong"));

    password.addEventListener("focus", () => {
        passwordAlert.classList.remove("d-none");
        if (!password.classList.contains("is-valid")) {
            password.classList.add("is-invalid");
        }
    });

    password.addEventListener("input", () => {
        const value = password.value;
        const isLengthValid = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*()\[\]{}\\|;:'",<.>/?`~]/.test(value);

        leng.classList.toggle("good", isLengthValid);
        leng.classList.toggle("wrong", !isLengthValid);
        bigLetter.classList.toggle("good", hasUpperCase);
        bigLetter.classList.toggle("wrong", !hasUpperCase);
        num.classList.toggle("good", hasNumber);
        num.classList.toggle("wrong", !hasNumber);
        specialChar.classList.toggle("good", hasSpecialChar);
        specialChar.classList.toggle("wrong", !hasSpecialChar);

        const isPasswordValid = isLengthValid && hasUpperCase && hasNumber && hasSpecialChar;

        if (isPasswordValid) {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");

            requirements.forEach((element) => {
                element.classList.remove("wrong");
                element.classList.add("good");
            });

            passwordAlert.classList.remove("alert-warning");
            passwordAlert.classList.add("alert-success");
        } else {
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");

            passwordAlert.classList.add("alert-warning");
            passwordAlert.classList.remove("alert-success");
        }
    });

    password.addEventListener("blur", () => {
        passwordAlert.classList.add("d-none");
    });

        const passwordInput = document.getElementById("password-input");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const confirmPasswordFeedback = document.querySelector("#confirmPassword + .invalid-feedback");

        passwordInput.addEventListener("input", validatePassword);
        confirmPasswordInput.addEventListener("input", validatePassword);

        function validatePassword() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Check if the passwords match
            if (password === confirmPassword) {
                confirmPasswordInput.setCustomValidity("");
                confirmPasswordFeedback.style.display = "none";
                return true
            } else {
                confirmPasswordInput.setCustomValidity("Passwords do not match");
                confirmPasswordFeedback.style.display = "block";
                return false
            }
        }

    

        const dobInput = document.getElementById("dob");
        const dobFeedback = document.querySelector("#dob + .invalid-feedback");
    
        dobInput.addEventListener("input", validateDate);
    
        function validateDate() {
            const dobValue = new Date(dobInput.value);
            const currentDate = new Date();
    
            // Check if the date is not in the future
            const isDateValid = dobValue <= currentDate;
    
            // Check if the age is not less than 16
            const age = calculateAge(dobValue);
            const isAgeValid = age >= 16;
    
            dobInput.setCustomValidity((isDateValid && isAgeValid) ? "" : "Invalid Date of Birth");
            dobFeedback.style.display = (isDateValid && isAgeValid) ? "none" : "block";
        }
    
        function calculateAge(birthDate) {
            const currentDate = new Date();
            const age = currentDate.getFullYear() - birthDate.getFullYear();
    
            // Adjust age if the birthday has not occurred yet this year
            if (
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
            ) {
                return age - 1;
            }
    
            return age;
        }
    
    
        // Server Side Validation

        let optional = ['m_name', 'pob']
        function FormIsValid() {
            
            let idRegex = /^\d{8}$/;
            let phoneRegex = /^07\d{8}$/;
            var currentDate = new Date();
        
            const unrequiredFields = ['m_name', 'pob'];
        
            for (let element of form.elements) {
                if (element.name) {
                    if (!unrequiredFields.includes(element.name) && !element.value.trim()) {
                        // alert('Please fill in all required fields.');
                        return false;
                    }
        
                    switch (element.name) {
                        case 'id_no':
                            if (!idRegex.test(element.value)) {
                                // alert('Invalid ID Number format. It should be of 8 digits.');
                                return false;
                            }
                            break;
        
                        case 'dob':
                            var inputDate = new Date(element.value);
                            var age = currentDate.getFullYear() - inputDate.getFullYear();
                            if (age < 16) {
                                // alert('Age must be greater than 16 years old.');
                                return false;
                            }
                            break;
        
                        case 'phone_no':
                            if (!phoneRegex.test(element.value)) {
                                // alert('Invalid Mobile Number format. It should start with 07 and be followed by 8 digits.');
                                return false;
                            }
                            break;
        
                        case 'confirmPassword':
                            if (element.value !== form.elements['password'].value) {
                                // alert('Password and Confirm Password do not match.');
                                return false;
                            }
                            break;
                    }
        
                    currentData[element.name] = element.value;
                }
            }
        
            return true; // All validations passed
        }
        
        
        


        // Button Disabling

        function disableBtn()
        {
            Array.from(form.elements).forEach(function (element) {
                element.addEventListener('keyup', () => {
                    if (FormIsValid()) {
                        submitBtn.removeAttribute("disabled");
                    } else {
                        submitBtn.setAttribute("disabled", "disabled");
                    }
                });
            });
        }


        

  
        form.addEventListener('submit', function (event) {
            console.log("Open")
            event.preventDefault();
            if (!FormIsValid())
            {
                disableBtn()
                form.classList.add("was-validated")
            }
            else
            {
                console.log(currentData);
                alert("Registration Successful")
                fetch("https://229e-102-23-139-23.ngrok-free.app/register",
                {
                method: "POST",
                headers:{
                    "Content-Type":"application/json" // To specify the type of data we want to send. Normally testing client does this automatically
                },
                body:JSON.stringify(currentData)
            }
                )
                .then((response)=>response.json())
                .then((data)=>
                {
                    console.log(JSON.stringify(data, null, 2));
                    console.log(data)
                    if (data.token !== undefined)
                    {
                        localStorage.setItem("UserToken", data.token);
                        console.log(localStorage.getItem("UserToken"));
                        window.location.replace("./index.html");
                    }
                    else
                    {
                        console.log("No Token")
                    }
                    
                })
                .catch((err)=>
                {
                    console.log(err)
                })
                
            }

});

});
