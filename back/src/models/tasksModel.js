const { default: mongoose } = require("mongoose"); //Traemos mongoose
const Users = require("./usersModel");

const taskSchema = new mongoose.Schema({ //Creamos un nuevo esquema
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    relevance: {
        type: String,
        enum: ["low", "default", "urgent", "critical"], //Enumeramos los tipos de prioridad
        default: "low" //Por defecto: low
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
}, { timestamps: true });

const Tasks = mongoose.model("Tasks", taskSchema, "tasks");

module.exports = Tasks;