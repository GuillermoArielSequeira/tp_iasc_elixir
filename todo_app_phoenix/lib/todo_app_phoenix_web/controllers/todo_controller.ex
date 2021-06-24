defmodule TodoAppPhoenixWeb.TodoController do
  use TodoAppPhoenixWeb, :controller

  def entries(conn, %{"list" => list}) do
    entries = list
    |> Todo.Cache.server_process
    |> Todo.Server.entries

    json(conn, entries)
  end

  def add_entry(conn, %{"list" => list, "name" => name}) do
    list
    |> Todo.Cache.server_process
    |> Todo.Server.add_entry(name)

    json(conn, :ok)
  end

  def rename_entry(conn, %{"list" => list, "entry_id" => entry_id, "name" => name}) do
    list
    |> Todo.Cache.server_process
    |> Todo.Server.rename_entry(entry_id, name)

    json(conn, :ok)
  end

end
