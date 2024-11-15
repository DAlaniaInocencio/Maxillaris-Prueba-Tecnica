PRUEBAS MAXILLARIS - GESTION DE ARCHIVOS
![image](https://github.com/user-attachments/assets/638df632-0647-4475-accb-35c4dbdbe4c0)
![image](https://github.com/user-attachments/assets/2e206a53-23a0-42be-a12e-5306a58e3f3f)
![image](https://github.com/user-attachments/assets/95ad1d7a-f017-47a2-9a67-e6a520286fd0)




Técnologias:
1.	Backend:
  o	Node.js con Express
  o	PostgreSQL para la base de datos usando typeorm
2.	Frontend:
  o	React.js (nativo) con Material UI
  o	Axios o Fetch API para las solicitudes HTTP al backend.
3.	Autenticación:
  o	Usar JWT para un sistema básico de autenticación.


## Instalación

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/DAlaniaInocencio/Maxillaris-Prueba-Tecnica.git

2. **DENTRO DE LA CARPETA BACK**
    -    agregar un documento ".env.development", agregar los siguientes variables de entorno:
      DB_USER=postgres
      DB_NAME=maxillaris2
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=postgres
      DB_PASSWORD=admin
      PORT=3000
      JWT_SECRET=your_secret_key
      NODE_ENV=jest
      FRONT=http://localhost:3001
  
    -    cd server
    -    npm install
    -    npm run dev
        
3. **DENTRO DE LA CARPETA FRONT**

   -    cd client
   -    npm install
   -    npm run dev

5. **RUTAS**
    User:
         GET    http://localhost:3000/api/users
         POST    http://localhost:3000/api/users

    AUTH:
       POST    http://localhost:3000/auth/login

    FILES:
       GET      http://localhost:3000/api/files/stats
       GET      http://localhost:3000/api/files
       POST     http://localhost:3000/api/files
       PUT      http://localhost:3000/api/files/:id
       DELETE   http://localhost:3000/api/files/:id
      
--------------     
