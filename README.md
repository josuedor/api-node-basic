# Basic API for node and mongodb

Taller # 1 Topicos Especiales

### Prerequisites

```
- node js ^8.x.x
- mongodb
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

## Documentation

* GET `/` : Obtienes en formato html el mensaje de bienvenida a la API.

### Tweets

* GET `/tweets` : Obtienes en formato json todos los tweets en la base de datos.

* GET `/tweets/:id` : Obtienes en formato json el tweet correspondiente al :id enviado como parametro en la url.
	* **URL Params**
	`id=[string]`

* POST `/tweets` : Crea un nuevo tweet en la base de datos.
	* **Data Params:**
	```json
	contenido=[string]
	user=[string] (id del usuario especificado en el document users)
	ubicacion=[string]
	```

	* **Example:**
	```json
	{
		"contenido": "El que se escama es porque es pecao.",
		"user": "5a651994c553170e6a85c581",
		"ubicacion": "Santa Marta"
	}
	 ```

* PUT `/tweets/:id` : Edita el tweet correspondiente al :id enviado como parametro en la url.
	* **URL Params**
	`id=[string]`

	* **Data Params:**
	```json
	contenido=[string] (opcional)
	user=[string] (opcional) (id del usuario especificado en el document users)
	ubicacion=[string] (opcional)
	```

	* **Example:**
	```json
	{
		"contenido": "El que se escama es porque es pecao v2.0.",
		"autor": "5a651994c553170e6a85c581",
		"ubicacion": "Santa Marta"
	}
	 ```

* DELETE `/tweets/:id` : Elimina el tweet guardado en la base de datos.
	* **URL Params**
	`id=[string]`


### Users

* GET `/users` : Obtienes en formato json todos los usuarios habilitados en la base de datos.

* GET `/users/:id` : Obtienes en formato json el usuarios correspondiente al :id enviado como parametro en la url.
	* **URL Params**
	`id=[string]`

* POST `/users` : Crea un nuevo usuarios en la base de datos.
	* **Data Params:**
	```json
	firstname=[string]
	lastname=[string]
	email=[string]
	enable=[string] (opcional)
	```

	* **Example:**
	```json
	{
		"firstname": "C. S",
		"lastname": "Lewis",
		"email": "lc@gmail.com"
	}
	 ```

* PUT `/users/:id` : Edita el usuario correspondiente al :id enviado como parametro en la url.
	* **URL Params**
	`id=[string]`

	* **Data Params:**
	```json
	{
		firstname=[string] (opcional)
		lastname=[string] (opcional)
		email=[string] (opcional)
		enable=[string] (opcional)
	}	
	```

	* **Example:**
	```json
	{
		"firstname": "Guillermo",
		"lastname": "del Toro",
		"email": "g.t@gmail.com"
	}
	 ```

* PUT `/users/:id/enable` : Edita el estado del usuario guardado en la base de datos.
	* **URL Params**
	`id=[string]`

	* **Data Params:**
	```json
	{
		value=[boolean]
	}
	```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
