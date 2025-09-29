# Etapa 1: Construcción
FROM node:18 AS build-stage

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Inyectar variables de entorno para Vite (build-time)
ARG VITE_BACKEND_URL
ARG VITE_AUTH_API_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL

# Construir la app
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine AS production-stage

# Copiar configuración de Nginx (opcional)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar build de Vite al servidor Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
