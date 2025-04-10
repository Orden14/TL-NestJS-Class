# TL-NestJS-Class

By Thomas L.
Class project for the EFREI NestJS course

Déploiement back : https://tl-nestjs-class.onrender.com/api/
Déploiement front : https://tl-nest-js-class.vercel.app/

Clone the repository
```bash
git clone https://github.com/Orden14/TL-NestJS-Class.git
cd TL-NestJS-Class
```

## Start the backend project
Backend made using NestJS

1. Move to the backend folder
```bash
cd moviebooker
```

2. Install dependencies
```bash
npm install
```

3. Build the database if you don't have one already (.env file already setup for the docker-compose config)
```bash
docker-compose --up -d
```

4. Set up your `themoviedb` API Key in the [.env](./moviebooker/.env) file

Run the backend
```bash
npm start
```

Swagger for the API is now available at`http://localhost:8000/api`

## Start the frontend project

Frontend made using ReactJS

1. Move to the frontend folder
```bash
cd frontapp
```

2. Install dependencies
```bash
npm install
```

3. Run the frontend
```bash
npm start
```

The frontend is now available at `http://localhost:3000`
