const mongoose = require("mongoose")
const Schema = mongoose.Schema

/*
    {
		id: 1,
		contenido: "Perro que ladra no muerde @lalala",
		autor: "@elpulgoso",
		ubicacion: "Barranquilla",
		fecha_creacion: moment().format(),
		fecha_educion: moment().format()
	}
*/

const schema = new Schema({
    contenido: {
        type: String,
        max: 280,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    ubicacion: {
        type: String,
        max: 32,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('tweet', schema)