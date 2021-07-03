defmodule TodoAppPhoenix.Horde.Cache do
  use Horde.DynamicSupervisor

  alias TodoAppPhoenix.Todo.{Server}

  def start_link(_) do
    IO.puts("Starting todo cache")
    Horde.DynamicSupervisor.start_link(__MODULE__, [strategy: :one_for_one], name: __MODULE__)
  end

  def init(init_arg) do
    [members: members()]
    |> Keyword.merge(init_arg)
    |> Horde.DynamicSupervisor.init()
  end

  # Interface Functions
  def server_process(todo_list_name) do
    case start_child(todo_list_name) do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
  end

  def server_processes() do
    processes = Horde.DynamicSupervisor.which_children(__MODULE__)
    Enum.map(processes, fn x ->
      case x do
        {_id, child, _type, [Server]} -> Server.name(child)
      end
    end)
  end

  defp start_child(todo_list_name) do
    Horde.DynamicSupervisor.start_child(__MODULE__, {Server, todo_list_name})
  end

  defp members() do
    [Node.self() | Node.list()]
    |> Enum.map(fn node -> {__MODULE__, node} end)
  end
end
