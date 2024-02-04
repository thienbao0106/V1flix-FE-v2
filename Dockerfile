FROM node:alpine as base

WORKDIR /V1flix-FE-V2

COPY package.json tsconfig.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn global add typescript tsc ts-node vite && yarn cache clean

COPY . .

RUN tsc

EXPOSE 5173

CMD ["yarn", "dev"]