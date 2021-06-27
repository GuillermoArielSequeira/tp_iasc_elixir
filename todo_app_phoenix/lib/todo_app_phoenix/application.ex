defmodule TodoAppPhoenix.Application do
  use Application

  def start(_type, _args) do
    topologies = 
    [
    example: [
      strategy: Cluster.Strategy.Kubernetes.DNSSRV,
      config: [
        service: "iasc-elixir",
        namespace: "utn-trackmed-dev",
        application_name: "iasc-elixir",
        polling_interval: 10_000
      ]
    ]
  ]
    children = [
      {Cluster.Supervisor, [topologies, [name: TodoAppPhoenix.ClusterSupervisor]]},
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
