"use strict"

const express = require("express")
const router = express.Router()

let moment = require("moment")

let database = [
	{
		id: 1,
		contenido: "Perro que ladra no muerde @lalala",
		autor: "@elpulgoso",
		ubicacion: "Barranquilla",
		fecha_creacion: moment().format(),
		fecha_educion: moment().format()
	},
	{
		id: 2,
		contenido: "El que se escama es porque es pecao @bocachico",
		autor: "@cachama",
		ubicacion: "Santa Marta",
		fecha_creacion: moment().format(),
		fecha_educion: moment().format()
	},
	{
		id: 3,
		contenido: "El hombre que trabaja y bebe todos los días, dejelo que vaya al medico",
		autor: "@saludsocial",
		ubicacion: "Bogotá",
		fecha_creacion: moment().format(),
		fecha_educion: moment().format()
	}
];

router.get('/', (req, res) => {
    res.json({message: 'Bienvenido al api del taller # 1 (express)!'})
})

router.get('/tweets', (req, res) => {
    res.json(database)
})

router.get('/tweets/:id', (req, res) => {
   let found = database.find(function(element) {
	  return element.id == 1;
	});

   res.json(found)
})

router.post('/tweets', (req, res) => {
    
	if (!req.body.contenido || !req.body.autor || !req.body.ubicacion) {
		res.json({
			error: `Los campos contenido, autor y ubicacion son requeridos.`,
			info:{
				contenido: req.body.contenido || 'No enviado',
				autor: req.body.autor || 'No enviado',
				ubicacion: req.body.ubicacion || 'No enviado'
			}
		})
	}else{

		if(req.body.contenido.length > 280 || req.body.autor.length > 32 || req.body.ubicacion.length > 64){
			res.json({
				error: `Los campos contenido, autor o ubicacion tienen demasiados caracteres.`,
				info:{
					contenido: (req.body.contenido.length > 280) ? 'Demasiados caracteres' : 'OK',
					autor: (req.body.autor.length > 280) ? 'Demasiados caracteres' : 'OK',
					ubicacion: (req.body.ubicacion.length > 280) ? 'Demasiados caracteres' : 'OK'
				}
			})
		}else{

			let tweet_temp = {
				id: (database.length > 0) ? database[database.length-1].id + 1 : 1,
	    		contenido: req.body.contenido,
	    		autor: req.body.autor,
				ubicacion: req.body.ubicacion,
				fecha_creacion: moment().format(),
				fecha_educion: moment().format()
	    	}

	    	database.push(tweet_temp)

	    	res.json({message: `El tweet se guardo correctamente. Gracias ${req.body.autor}`})
			
		}
	}
})

router.put('/tweets/:id', (req, res, next) => {
	
	let flag = false;
	
	for (let i = 0; i < database.length; i++){
		if (database[i].id == req.params.id) {
	   		database[i] = {
	   			id: database[i].id,
	   			contenido: req.body.contenido || database[i].contenido,
	    		autor: req.body.autor || database[i].autor,
				ubicacion: req.body.ubicacion || database[i].ubicacion,
				fecha_creacion: database[i].fecha_creacion,
				fecha_educion: moment().format()
	   		}
	   			
	   		flag = true;
	   	}
   }

   if (flag) {
	   res.json({message: `tweet editado correctamente.`})
   }else{
	   next(new Error("hubo un problema al editar el tweet. Quizá el :id del tweet no existe."))
   }
})

router.delete('/tweets/:id', (req, res, next) => {
	
	let flag = false;
	
	for (let i = 0; i < database.length; i++){
		if (database[i].id == req.params.id) {
	   		database.splice(i, 1)
	   		flag = true;
	   	}
   }

   if (flag) {
	   res.json({message: `tweet eliminado correctamente.`})
   }else{
	   next(new Error("hubo un problema al eliminar el tweet. Quizá el :id del tweet no existe."))
   }
})


module.exports = router
