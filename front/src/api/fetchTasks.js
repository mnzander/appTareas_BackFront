export const createTask = async(name, description) => { //CREAR TAREA
    try{
        const token = localStorage.getItem("token"); //Recibimos el token
        const response = await fetch("http://localhost:9000/tasks/", { //Llamamos a la API
            method: "POST", //Metodo POST (crear)
            headers: {
                "Content-Type": "application/json", //OBLIGATORIO
                "auth": token //Metemos el token como header "auth" --> Es auth por como esta en el Middleware del back
            },
            body: JSON.stringify({ name, description }) //El body son los campos
        });

        if(!response.ok){ //Si la respuesta no es OK
            throw new Error(`HTTP error! status: ${response.status}`); //Sacamos un error
        }

        const newTask = await response.json(); //Guardamos la respuesta de la API
        return newTask; // Y la devolvemos

    } catch(error) {
        console.error("Error creating the tasks: ", error);
        throw error; 
    }
};

export const getTasksByUser = async() => { //TRAER TAREAS
    try{
        const token = localStorage.getItem("token"); //Recibimos el token
        const response = await fetch("http://localhost:9000/tasks/", { //Llamamos a la API
            method: "GET", //Metodo GET (RECIBIR)
            headers: {
                "Content-Type": "application/json", //OBLIGATORIO
                "auth": token //Metemos el token como header "auth" --> Es auth por como esta en el Middleware del back
            },
        });
        const tasks = await response.json(); //Guardamos la respuesta de la API
        return tasks; // Y la devolvemos

    } catch(error){
        console.error("Error getting the tasks: ", error);
        throw error;
    }
};

export const updateTaskById = async(id, name, description) => { //ACTUALIZAR TAREA
    try{
        const token = localStorage.getItem("token"); //Recibimos el token
        const response = await fetch("http://localhost:9000/tasks/" + id, { //Llamamos a la API
            method: "PUT", //Metodo PUT (Actualizar)
            headers: {
                "Content-Type": "application/json", //OBLIGATORIO
                "auth": token //Metemos el token como header "auth" --> Es auth por como esta en el Middleware del back
            },
            body: JSON.stringify({ name, description }) //El body son los campos
        });
        
        if (!response.ok) { //Si la respuesta no es OK
            throw new Error('HTTP error! status: ' + response.status); //Sacamos un error
        }

        const updatedTask = await response.json(); //Guardamos la respuesta de la API
        console.log("Tarea creada con exito:", updatedTask.data); 
        return updatedTask; // Y la devolvemos
        
    } catch(error) {
        console.error("Error al actualizar la tarea:", error);
        throw error;
    }
};

export const deleteTaskById = async(id) => { //BORRAR TAREA
    try{
        const token = localStorage.getItem("token"); //Recibimos el token
        const response = await fetch("http://localhost:9000/tasks/"+id, { //Llamamos a la API
            method: "DELETE", //Metodo DELETE (borrar)
            headers: {
                "Content-Type": "application/json", //OBLIGATORIO
                "auth": token //Metemos el token como header "auth" --> Es auth por como esta en el Middleware del back
            },
        });
        await response.json(); //Esperamos la respuesta de la API

    } catch(error){
        console.error("Error deleting the task: ", error);
        throw error;
    }
};