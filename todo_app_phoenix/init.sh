#!/bin/sh


PORT=4000 elixir --name elixir@${MY_POD_IP} --cookie asdf -S mix phx.server

