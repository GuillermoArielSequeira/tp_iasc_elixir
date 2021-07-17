FROM elixir:alpine 

WORKDIR /opt/app


RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache --update \
    nodejs \
    yarn \
    git \
    build-base \
    inotify-tools && \
  mix local.rebar --force && \
  mix local.hex --force


COPY . .

RUN cd ./assets && \
    yarn install && yarn build && \
    cd - 

RUN mix do deps.get, deps.compile


COPY init.sh /init/init.sh

RUN chmod 777 /init/init.sh

EXPOSE 4000

ENTRYPOINT [ "/init/init.sh" ]


