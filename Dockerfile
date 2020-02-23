FROM node:10.18.1

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn install

# execute when there is no prebuild (.nuxt isn't available)
#RUN yarn run build

ENV HOST 0.0.0.0