FROM elixir:alpine 

WORKDIR /opt/app

RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache --update \
    nodejs \
    yarn \
    git \
    build-base && \
  mix local.rebar --force && \
  mix local.hex --force


COPY . .

RUN cd ./assets && \
    yarn install && yarn build && \
    cd - 

RUN mix do deps.get, deps.compile

EXPOSE 4000

ENTRYPOINT [ "mix" ]

CMD [ "phx.server" ]
