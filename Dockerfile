# Etapa 1: Construcción
FROM node:18 AS build-stage

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación con Vite
RUN npm run build

# Etapa 2: Servir el contenido con Nginx
FROM nginx:alpine AS production-stage

# Copiar configuración personalizada de Nginx (opcional, útil si usas rutas en React Router)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar el build generado al servidor Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
