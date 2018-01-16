# Taller Node y Express

Taller # 1 Topicos Especiales

### Prerequisites

```
node js ^8.x.x
```

### Installing

Clona el repositoio 

```
git clone https://github.com/josuedor/api-node-basic.git
```

Instalas las dependencias

```
npm install
```

Ejecuta el proyecto

```
npm start
```

### Documentation

* GET `/` : Obtienes en formato html el mensaje de bienvenida a la API.

* GET `/tweets` : Obtienes en formato json todos los tweets almacenados en memoria.

* GET `/tweet/:id` : Obtienes en formato json el tweet correspondiente al :id enviado como parametro en la url.
	* **URL Params**
	`id=[integer]`

* POST `/tweet` : Crea un nuevo tweet en memoria.
	* **Data Params:**
	```json
	contenido=[string]
	autor=[string]
	ubicacion=[string]
	```

	* **Example:**
	```json
	{
		"contenido": "El que se escama es porque es pecao.",
		"autor": "lacachama",
		"ubicacion": "Santa Marta"
	}
	 ```

* PUT `/tweet/:id` : Edita el tweet correspondiente al :id enviado como parametro en la url.
	* **URL Params**
	`id=[integer]`

	* **Data Params:**
	```json
	contenido=[string] (opcional)
	autor=[string] (opcional) (opcional)
	ubicacion=[string] (opcional)
	```

	* **Example:**
	```json
	{
		"contenido": "El que se escama es porque es pecao v2.0.",
		"autor": "lacachama",
		"ubicacion": "Santa Marta"
	}
	 ```

* DELETE `/tweet/:id` : Elimina el tweet guardado en memoria.
	* **URL Params**
	`id=[integer]`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
