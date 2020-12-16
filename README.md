
# Wchallenge, CoinGecko wrapper con Nodejs

 **Requerimientos**
> MySQL
> NodeJS +10

 **Instalación**
 Pararse en la carpeta principal y correr en consola:
  >`npm install`
  > 
  **Crear un nuevo esquema en mysql con cualquier nombre, luego, renombrar el 
  archivo ".env_example" a ".env" y configurar lo siguiente:**
  
	
	DBNAME = wchallengedb (Nombre del esquema creado)
	DBUSERNAME = root (Username a de la base de datos)
	DBPASSWORD = (Password de la base de datos)
	DBHOST = localhost (ip a la base de datos)
	

  

 **Iniciar backend en entorno desarrollo**
 Pararse en la carpeta principal y correr en consola:
  >`npm run dev`

## Endpoints
**USUARIO**

POST
>`/api/`  `user`/  `add` 
>>Recibe body (Obligatorio)
>
	{
		username: STRING,
		password: STRING,
		moneda: STRING, permite solamente ARS, USD, EUR
	}
	
POST
>`/api/`  `user`/  `login` 
>>Recibe body (Obligatorio)
>
	{
		username: STRING,
		password: STRING,
	}

### Cryptomonedas
#### Nota: los siguientes endpoint TODOS requieren token valido cargado en el header como "token" 

GET
>`/api/`  `crypto`/  `listall` 
>Muestra todas las monedas disponibles
>>Recibe parámetros (No obligatorio)
>
	{
		orden: STRING, (asc o desc ) default: desc
		cantidad: INT, (cantidad de monedas a mostrar en la consulta) default: 20
	}
GET
>`/api/`  `crypto`/  `listbyuser` 
>Muestra las monedas que el usuario tenga guardadas para su seguimiento
>>Recibe parámetros (No obligatorio)
>
	{
		orden:  STRING, (asc o desc) default: desc
		
		cantidad: INT, default 25
		
		moneda: STRING, moneda a convertir el precio de las crypto, si no se envia, usa la moneda
						preferida del usuario
	}
POST
>`/api/`  `crypto`/  `add` 
>Agrega moneda al seguimiento del usuario logueado (token)
>>Recibe parámetros (Obligatorio)
>
	{
		crypto_id:  STRING, (id de la moneda que se encuentra en la consulta "listall")
							por ejemplo "bitcoin", "ethereum" etc
	}
DELETE
>`/api/`  `crypto`/  `remove` 
>Corta el seguimiento de la moneda seleccionada por el usuario
>>Recibe parámetros  (Obligatorio)
>
	{
		crypto_id:  STRING, (id de la moneda que se encuentra en la consulta "listall")
							por ejemplo "bitcoin", "ethereum" etc
	}
	
	
