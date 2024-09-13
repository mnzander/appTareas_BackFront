import { createTask, deleteTaskById, getTasksByUser, updateTaskById } from "./api/fetchTasks.js";

document.addEventListener('DOMContentLoaded', function() {
    
    const taskContainer = document.createElement("div"); //Creamos un contenedor para las tareas
    taskContainer.className = "task-container"; //Les damos una clase

    const loadTasks = async() => { //Cargamos las tareas
        try{
            const notas = await getTasksByUser(); //Llamamos al fetch GET tareas
            if(notas && Array.isArray(notas.data)) { //Si hay notas y si es array
                mostrarNotas(notas.data); // LLamamos a la funcion de mostrar
            } else { //Si no...
                console.error("No se obtuvieron notas..."); //Mostramos un error
            }
        } catch (error) {
            console.error("Error al cargar las notas", error);
        }
    }

    const mostrarNotas = (notas) => { //Mostramos las notas
        notas.forEach(note => { //Por cada nota
            const li = document.createElement("li"); //Creamos un elemento "li"
            const noteButton = document.createElement("button"); //Creamos un elemento "button"
            noteButton.textContent = note.name; //Añadimos el nombre de la tarea como el texto del botón

            const editBtn = document.createElement("button"); //Creamos un botón para editar
            editBtn.textContent = "Editar"; //Añadimos el texto
            editBtn.className = ("edit-button"); //Añadimos la clase
    
            li.appendChild(noteButton); //Cada boton de detalle es hijo de cada "li"
            li.appendChild(editBtn); //Cada boton de editar es hijo de cada "li"
    
            noteButton.onclick = () => { //Al clickar en el boton de detalle...
                showNoteDetails(note); //Se ejecuta la función showNoteDetails y le enviamos toda la informacion de su tarea.
            };

            editBtn.addEventListener('click', function(){ //Al clickar en el botón de editar...
                const modal = document.getElementById("update-modal"); //Declaramos el modal del HTML
                modal.style.display = "block"; //Hacemos que aparezca

                const closeBtn = document.getElementById("update-close-btn"); //Declaramos el botón de cerrar el modal de edición
                closeBtn.onclick = () => { //Cuando clickemos en el...
                    modal.style.display = "none"; //Escondemos el modal de edición
                };
                
                const updateModalBtn = document.getElementById("update-task-btn"); //Declaramos el botón de Guardar Cambios de edición
                updateModalBtn.addEventListener("click", async function() { //Cuando clickemos en el boton...                   
                    let updateName = document.getElementById("update-name").value.trim(); //Recogemos el valor del campo nombre sin espacios por fuera
                    let updateDescription = document.getElementById("update-description").value.trim(); //Recogemos el valor del campo descripción de la misma forma
        
                    updateName ??= document.getElementById("name").value.trim(); //Si el campo esta vacio, dale el valor que ya tenia el nombre
                    updateDescription ??= document.getElementById("description").value.trim(); //Si el campo esta vacio, dale el valor que ya tenia la descripcion

                    if (!updateName && !updateDescription) { //Si ambos campos estan vacios
                        alert("Por favor, rellena todos los campos."); //Mandamos una alerta de rellenar campos
                        return; //Para que no siga
                    }
        
                    try {
                        window.location.reload(); //Recargamos la página (duda)
                        await updateTaskById(note._id, updateName, updateDescription); //Llamamos a la funcion de UPDATE con el ID de la tarea y la nueva info
                    } catch (error) {
                        console.error("Error al editar la tarea:", error);
                    }
                });
            });
    
            document.querySelector('.task-list').appendChild(li); //Cada "li" es hijo del "ol"(task-list)
        });
    };

    const showNoteDetails = (nota) => { //Enseñamos los detalles
        const modal = document.getElementById("detail-modal"); //Declaramos la modal de detalle
        modal.innerHTML = ""; //Vaciamos el contenido por si clickamos en otra tarea
        modal.style.display = "block"; //Mostramos el modal

        const h2 = document.createElement("h2"); //Añadimos un h2
        h2.textContent = "Detalles de la tarea: "; //Su texto

        const taskName = document.createElement("p"); //Añadimos un parraro para el nombre
        taskName.textContent = `Nombre: ${nota.name}`; //Añadimos el nombre de la tarea

        const taskDescription = document.createElement("p"); //Añadimos un parraro para la descripción
        taskDescription.textContent = `Descripción: ${nota.description}`; //Añadimos la descripcion de la tarea

        const taskRelevance = document.createElement("p"); //Añadimos un parrafo para la prioridad
        taskRelevance.textContent = `Prioridad: ${nota.relevance}`; //Añadimos la prioridad de la tarea

        const taskDate= document.createElement("p"); //Añadimos un parrafo para la fecha de creacion
        taskDate.textContent = `Fecha: ${new Date(nota.createdAt).toLocaleDateString()}`; //Añadimos la fecha en string
        
        const deleteBtn = document.createElement("button"); //Creamos el boton de borrar nota
        deleteBtn.textContent = "Borrar"; //Le ponemos el texto
        deleteBtn.addEventListener("click", async function(){ //Cuando hagamos click en borrar...
            await deleteTaskById(nota._id); //Llamamos a la funcion DELETE con el parametro de su ID
            modal.style.display = "none"; //Escondemos el modal de detalle
            window.location.reload(); //Y recargamos la pagina para que veamos los cambios en la lista
        });

        const closeBtn = document.createElement("button"); //Creamos el boton de cerrar modal de detalles
        closeBtn.textContent = "Cerrar" //Le ponemos texto
        closeBtn.onclick = () => { //Cuando hagamos click en el boton de cerrar...
            modal.style.display = "none"; //Escondemos el modal
        };

        modal.appendChild(h2); //H2 es hijo del modal
        modal.appendChild(taskName); //El nombre es hijo del modal
        modal.appendChild(taskDescription); //La descripcion es hijo del modal
        modal.appendChild(taskRelevance); //La prioridad es hijo del modal
        modal.appendChild(taskDate); //La fecha es hijo del modal
        modal.appendChild(deleteBtn); //El boton de borrar es hijo del modal
        modal.appendChild(closeBtn); //El boton de cerrar es hijo del modal
    }

    const createBtn = document.getElementById("create-btn"); //Declaramos el boton de crear tarea
    createBtn.addEventListener("click", function(){ //Cuando clickemos en el...
        const modal = document.getElementById("create-modal"); //Declaramos la modal de creacion
        modal.style.display = "block"; //Hacemos que aparezca

        const createTaskBtn = document.getElementById("create-task-btn"); //Declaramos el boton de Guardar nueva tarea
        createTaskBtn.addEventListener("click", async function(){ //Cuando clickemos en el boton...
            const createName = document.getElementById("create-name").value.trim(); //Guardamos el valor del campo Nombre sin espacios exteriores
            const createDescription = document.getElementById("create-description").value.trim(); //Guardamos el valor del campo Descripcion sin espacios exteriores

            if (!createName || !createDescription) { //Si ambos campos estan vacios...
                alert("Por favor, rellena todos los campos."); //Mandamos una alerta de rellenar campos
                return; //Hacemos que no siga
            }

            try{
                const newTask = await createTask(createName, createDescription); //LLamamos a la funcion de CREATE con la informacion de los campos
                console.log("Tarea creada con exito:", newTask.data); //Controlamos que datos enviamos
                window.location.reload(); //Recargamos la pagina para ver los cambios en la lista
                
            } catch(error) {
                console.error("Error al crear la tarea:", error);
            }
        });

        const closeBtn = document.getElementById("create-close-btn"); //Declaramos el boton de cerrar modal de creacion
        closeBtn.onclick = () => { //Cuando clickemos en el...
            modal.style.display = "none"; //Escondemos la modal de creacion
        };
    });

    loadTasks(); //Llamamos a la funcion
    document.querySelector(".app").appendChild(taskContainer); //El contenedor de tareas es hijo de main
});