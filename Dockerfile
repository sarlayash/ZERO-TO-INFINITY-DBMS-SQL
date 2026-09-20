FROM node:24-alpine
WORKDIR /app
COPY package.json server.js ./
COPY public ./public
RUN mkdir -p data
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
