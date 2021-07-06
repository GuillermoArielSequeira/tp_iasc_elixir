defmodule TodoAppPhoenixWeb.TodoController do
  use TodoAppPhoenixWeb, :controller
  # use Phoenix.Channel

  alias TodoAppPhoenix.Horde.{Cache, Server}

  # def join("todo", _message, socket) do
  #   {:ok, socket}
  # end

  @doc """
    Retrieve all the todo lists created
  """
  def todo_lists(conn, _params) do
    json(conn, Cache.server_processes())
  end

  @doc """
    Create new todo list with name `list_name` and some initial tasks `tasks`.
    `tasks` can me empty or optional
  """
  def create(conn, %{"list_name" => list_name, "tasks" => tasks}) do
    todo_server = Cache.server_process(list_name)
    new_list = Enum.map(tasks, fn t -> Server.add_entry(todo_server, t) end)

    json(conn, new_list)
  end

  @doc """
    Retrieve all tasks from todo list with name `list_name`.
    If todo list not exists, creates a new one
  """
  def entries(conn, %{"list_name" => list_name}) do
    entries = list_name
      |> Cache.server_process
      |> Server.entries

    json(conn, entries)
  end

  @doc """
    Add new task with `name` into todo list with name `list_name`
  """
  def add_entry(conn, %{"list_name" => list_name, "name" => name}) do
    list_name
    |> Cache.server_process
    |> Server.add_entry(name)
    TodoAppPhoenixWeb.Endpoint.broadcast("todo", "update_list", %{ok: "ok"})
    json(conn, :ok)
  end


  @doc """
    Update either rename or resolve task with id `entry_id` from todo list with name `list_name`
  """
  def update_entry(conn, %{"list_name" => list_name, "entry_id" => entry_id} = params) do
    case Map.get(params, "name") do
      nil -> Cache.server_process(list_name)
      name -> rename_entry(list_name, entry_id, name)
    end

    case Map.get(params, "resolve") do
      nil -> :ok
      _ -> resolve_entry(list_name, entry_id)
    end
    TodoAppPhoenixWeb.Endpoint.broadcast("todo", "update_list", %{ok: "ok"})
    json(conn, :ok)
  end

  @doc """
    Delete task with id `entry_id` in todo list `list_name`
  """
  def delete_entry(conn, %{"list_name" => list_name, "entry_id" => entry_id}) do
    list_name
      |> Cache.server_process
      |> Server.delete_entry(String.to_integer(entry_id))
      TodoAppPhoenixWeb.Endpoint.broadcast("todo", "update_list", %{ok: "ok"})
    json(conn, :ok)
  end

  # TODO
  @doc """
    Move position between two tasks in list `list_name`, task from as `entry_id_from` and task to `entry_id_to`
  """
  def move(conn, %{"list_name" => list_name, "entry_id_from" => entry_from_id, "entry_id_to" => entry_id_to}) do
    IO.puts(inspect list_name)
    IO.puts(inspect entry_from_id)
    IO.puts(inspect entry_id_to)
    json(conn, :ok)
  end

  defp rename_entry(list_name, entry_id, new_name) do
    list_name
    |> Cache.server_process
    |> Server.rename_entry(String.to_integer(entry_id), new_name)
  end

  defp resolve_entry(list_name, entry_id) do
    list_name
    |> Cache.server_process
    |> Server.resolve_entry(String.to_integer(entry_id))
  end

end
