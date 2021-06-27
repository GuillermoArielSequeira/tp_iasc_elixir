defmodule TodoAppPhoenix.Application do
  use Application

  def start(_type, _args) do
    topologies = [
      example: [
        strategy: Cluster.Strategy.Epmd,
        config: [
          hosts: [
            :"node@iasc-elixir-0.iasc-elixir.default.svc.cluster.local",
            :"node@iasc-elixir-1.iasc-elixir.default.svc.cluster.local",
            :"node@iasc-elixir-2.iasc-elixir.default.svc.cluster.local"
          ]
        ]
      ]
    ]
    children = [
      {Cluster.Supervisor, [topologies, [name: TodoAppPhoenix.ClusterSupervisor]]}
      TodoAppPhoenixWeb.Telemetry,
      {Phoenix.PubSub, name: TodoAppPhoenix.PubSub},
      TodoAppPhoenixWeb.Endpoint,
      Todo.System
    ]
    opts = [strategy: :one_for_one, name: TodoAppPhoenix.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    TodoAppPhoenixWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
