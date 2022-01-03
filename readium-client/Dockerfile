FROM node:17 as builder
WORKDIR /app
COPY . .
RUN npm i && npm run build



FROM nginx:1.21.5
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]