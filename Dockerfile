FROM node:lts-alpine
# install simple http server for serving static content
RUN yarn global add http-server
# make the 'app' folder the current working directory
WORKDIR /app
# copy 'package.json' to install dependencies
COPY package*.json ./
# install dependencies
RUN rm -rf node_modules && yarn cache clean && yarn install
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN yarn build
EXPOSE 5173
CMD [ "http-server", "dist" ]