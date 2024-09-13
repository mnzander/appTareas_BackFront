export const addUser = async(bodyParams) => { //CREAR USUARIO 
    try{
        const response = await fetch("http://localhost:9000/users/register", { //Llamamos a la API
            method: "POST", //Metodo POST (crear)
            headers: { "Content-Type": "application/json" }, //OBLIGATORIO
            body: bodyParams //Los campos del formulario
        });
        const newUser = await response.json(); //Guardamos la respuesta de la API
        return newUser; // Y la devolvemos

    } catch (error) {
        console.error("Error creating the user: ", error);
        throw error;
    }
};

export const loginUser = async(bodyParams) => { //LOGIN USUARIO
    try{
        const response = await fetch("http://localhost:9000/users/login", { //Llamamos a la API
            method: "POST", //Metodo POST (crear)
            headers: { "Content-Type": "application/json" }, //OBLIGATORIO
            body: bodyParams //Los campos del formulario
        });
        const login = await response.json();  //Guardamos la respuesta de la API
        return login; // Y la devolvemos
        
    } catch (error) {
        console.error("Error login the user: ", error);
        throw error;
    }
};