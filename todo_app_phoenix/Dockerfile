ARG ALPINE_VERSION=3.8

FROM elixir:1.7.2-alpine as builder

WORKDIR /opt/app

RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache \
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

RUN mix do deps.get, deps.compile, compile

RUN \
  mkdir -p /opt/built && \
  mix distillery.release --verbose && \
  cp _build/prod/rel/todo_app_phoenix/releases/1.0/todo_app_phoenix.tar.gz /opt/built && \
  cd /opt/built && \
  tar -xzf todo_app_phoenix.tar.gz && \
  rm todo_app_phoenix.tar.gz


FROM alpine:3.8

RUN apk update && \
    apk add --no-cache \
      bash \
      openssl-dev

ENV REPLACE_OS_VARS=true \
    APP_NAME=todo_app_phoenix

WORKDIR /opt/app

COPY --from=builder /opt/built .

CMD trap 'exit' INT; /opt/app/bin/todo_app_phoenix foreground