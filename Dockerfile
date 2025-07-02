# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto Vite
RUN npm run build

# Etapa 2: servir com NGINX
FROM nginx:stable-alpine

# Copia o build para o diretório padrão do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Substitui a config do NGINX para SPA (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]