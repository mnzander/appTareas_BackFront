import { addUser, loginUser } from "./api/fetchUser.js";

document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm'); //Declaramos el formulario de LOGIN
    const signupForm = document.getElementById('signupForm'); //Declaramos el formulario de REGISTER

    const createNewBtn = document.getElementById("createnew-btn"); //Declaramos el boton de CREATE NEW
    const registerBtn = document.getElementById('register-btn'); //Declaramos el botón de REGISTER
    const loginBtn = document.getElementById("login-btn"); //Declaramos el botón de LOG IN

    createNewBtn.addEventListener('click', function() { //Al clickar en el boton de CREATE NEW...
        loginForm.style.display = 'none'; //Escondemos el formulario LOGIN
        signupForm.style.display = 'block'; //Mostramos el formulario REGISTER
    });

    registerBtn.addEventListener('click', async function() { //Al clickar en el boton de REGISTER...
        this.disabled = true; //Bloqueamos el boton mientras se procesa la solicitud
        try{
            const newName = document.getElementById("new-name").value.trim(); //Recogemos el valor del Nombre de usuario
            const newEmail = document.getElementById("new-email").value.trim(); //Recogemos el valor del Email
            const newPassword = document.getElementById("new-password").value.trim(); //Recogemos el valor de la contraseña
    
            console.log("Registro intentado:", { //Hacemos log del registro
                nombre: newName,
                email: newEmail,
                password: newPassword,
            });

            if (!newName || !newEmail || !newPassword) { //Si alguno de los campos esta vacio...
                throw new Error("Por favor, complete todos los campos."); //Mandamos un error de rellenar campos
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Comprobamos que el email tenga @ y .
            if (!emailRegex.test(newEmail)) { //Si el Email no tiene @ y .
                throw new Error("El email debe contener @ y ."); //Mandamos un error de que el email necesita @ y .
            }
    
            const newUser = await addUser(JSON.stringify({ //Llamamos a la funcion CREATE User con los datos pasados como string
                name: newName,
                email: newEmail,
                password: newPassword
            }));
    
            console.log("Datos registrados:", newUser.data); //Hacemos log de los datos recibidos por el CREATE User
            alert ("Usuario registrado con éxito!"); //Mandamos una alerta de exito
            signupForm.style.display = 'none'; //Escondemos el formulario de REGISTER
            loginForm.style.display = 'block'; //Enseñamos el formulario de LOGIN

        } catch (error){
            console.error("Error al registrar:", error);
            alert(`Error al registrar: ${error.message}`);

        } finally { //Se ejecutará en cualquier caso al final 
            this.disabled = false; //Desbloqueamos el botón
        }
    });

    // Por defecto, al hacer Submit en signupForm, se iria al loginForm
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); //Asi, evitamos que lo haga y que se quede.
    });

    loginBtn.addEventListener("click", async function() { //Cuando hagamos click en el boton LOGIN...
        try{
            const email = document.getElementById("email").value.trim(); //Recogemos el valor del campo EMAIL
            const password = document.getElementById("password").value.trim(); //Recogemos el valor del campo PASSWORD

            console.log("Login intentado: ", { //Hacemos log de los datos
                email: email,
                password: password,
            });

            if (!email || !password) { //Si alguno de los campos esta vacio
                throw new Error("Por favor, rellene todos los campos"); //Mandamos un error de rellenar campos
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Comprobamos que el email tenga @ y .
            if(!emailRegex.test(email)) { //Si el Email no tiene @ y .
                throw new Error("El email debe contener @ y ."); //Mandamos un error de que el email necesita @ y .
            }

            const userLog = await loginUser(JSON.stringify({ //Llamamos a la funcion de LOGIN user con los parametros como string
                email: email,
                password: password,
            }));

            if(userLog.data === undefined) { //Si los datos recibidos son undefined
                throw new Error("El email y la contraseña no coinciden"); //Los datos del usuario no coindiden
            }

            console.log("Datos registrados:", userLog.data); //Hacemos log de los datos recibidos
            localStorage.setItem("token", userLog.token) //Guardamos en el local Storage el token JWT del usuario
            console.log(localStorage.getItem("token")) //Comprobamos el token con log
            window.location.href = "dashboard.html"; //Redirigimos a la pagina de Dashboard.html

        } catch (error) {
            console.error("Error al hacer login:", error);
            alert(`Error al hacer login: ${error.message}`);
        }
    });
});