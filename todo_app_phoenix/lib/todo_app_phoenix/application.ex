defmodule TodoAppPhoenix.Application do
  use Application

  def start(_type, _args) do
    children = [
      # Start Cluster Supervisor
      {Cluster.Supervisor, [topologies(), [name: TodoAppPhoenix.ClusterSupervisor]]},
      # Start the Telemetry supervisor
      TodoAppPhoenixWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: TodoAppPhoenix.PubSub},
      # Start Horde
      TodoAppPhoenix.NodeObserver,
      # Start Domain childrens
      # TodoAppPhoenix.Todo.System,
      TodoAppPhoenix.Horde.Registry,
      TodoAppPhoenix.Horde.Cache,
      # Start the Endpoint (http/https)
      TodoAppPhoenixWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: TodoAppPhoenix.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    TodoAppPhoenixWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  defp topologies do
    [
      todo_app_phoenix: [
        strategy: Cluster.Strategy.Gossip
      ]
    ]
  end
end
