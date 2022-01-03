FROM node:17

ARG PORT=5000
ENV PORT ${PORT}

EXPOSE ${PORT}

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/local

COPY package*.json ./
RUN npm install && npm install pm2 -g && npm cache clean --force
ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app

COPY . .