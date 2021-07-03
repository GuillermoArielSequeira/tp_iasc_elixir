# defmodule TodoAppPhoenix.Todo.Server do
#   use GenServer, restart: :temporary

#   alias TodoAppPhoenix.Todo.{List, ProcessRegistry, Server}

#   # Callback functions
#   @impl GenServer
#   def init(name) do
#     IO.puts("Starting todo server for #{name}")
#     {:ok, {name, List.new()}}
#   end

#   @impl GenServer
#   def handle_cast({:rename_entry, entry_id, new_name}, {name, todo_list}) do
#     new_list = List.rename_entry(todo_list, entry_id, new_name)
#     {:noreply, {name, new_list}}
#   end

#   @impl GenServer
#   def handle_cast({:add_entry, new_entry}, {name, todo_list}) do
#     new_list = List.add_entry(todo_list, new_entry)
#     {:noreply, {name, new_list}}
#   end

#   @impl GenServer
#   def handle_cast({:resolve_entry, entry_id}, {name, todo_list}) do
#     new_list = List.resolve_entry(todo_list, entry_id)
#     {:noreply, {name, new_list}}
#   end

#   @impl GenServer
#   def handle_cast({:delete_entry, entry_id}, {name, todo_list}) do
#     new_list = List.delete_entry(todo_list, entry_id)
#     {:noreply, {name, new_list}}
#   end

#   @impl GenServer
#   def handle_call({:name}, _caller, {name, todo_list}) do
#     {:reply, name, {name, todo_list}}
#   end

#   @impl GenServer
#   def handle_call({:entries}, _caller, {name, todo_list}) do
#     entries = List.entries(todo_list)
#     {:reply, entries, {name, todo_list}}
#   end

#   # Interface functions
#   def start_link(name) do
#     GenServer.start_link(Server, name, name: via_tuple(name))
#   end

#   def name(todo_server) do
#     GenServer.call(todo_server, {:name})
#   end

#   def add_entry(todo_server, new_entry) do
#     GenServer.cast(todo_server, {:add_entry, new_entry})
#   end

#   def entries(todo_server) do
#     GenServer.call(todo_server, {:entries})
#   end

#   def rename_entry(todo_server, entry_id, new_name) do
#     GenServer.cast(todo_server, {:rename_entry, entry_id, new_name})
#   end

#   def resolve_entry(todo_server, entry_id) do
#     GenServer.cast(todo_server, {:resolve_entry, entry_id})
#   end

#   def delete_entry(todo_server, entry_id) do
#     GenServer.cast(todo_server, {:delete_entry, entry_id})
#   end

#   # Private functions
#   defp via_tuple(name) do
#     ProcessRegistry.via_tuple({__MODULE__, name})
#   end

# end
