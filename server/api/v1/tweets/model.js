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
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'author'
    },
    ubicacion: String,
},{
    timestamps: true
})

module.exports = mongoose.model('tweet', schema)