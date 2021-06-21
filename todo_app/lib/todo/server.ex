defmodule Todo.Server do
  use GenServer, restart: :temporary

  # Callback functions
  @impl GenServer
  def init(name) do
    IO.puts("Starting todo server for #{name}")
    {:ok, {name, Todo.List.new()}}
  end

  @impl GenServer
  def handle_cast({:add_entry, new_entry}, {name, todo_list}) do
    new_list = Todo.List.add_entry(todo_list, new_entry)
    {:noreply, {name, new_list}}
  end

  @impl GenServer
  def handle_call({:entries}, _caller, {name, todo_list}) do
    entries = Todo.List.entries(todo_list)
    {:reply, entries, {name, todo_list}}
  end

  # Interface functions
  def start_link(name) do
    GenServer.start_link(Todo.Server, name, name: via_tuple(name))
  end

  def add_entry(todo_server, new_entry) do
    GenServer.cast(todo_server, {:add_entry, new_entry})
  end

  def entries(todo_server) do
    GenServer.call(todo_server, {:entries})
  end

  # Private functions
  defp via_tuple(name) do
    Todo.ProcessRegistry.via_tuple({__MODULE__, name})
  end

end
