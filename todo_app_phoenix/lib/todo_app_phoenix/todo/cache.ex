# defmodule TodoAppPhoenix.Todo.Cache do

#   alias TodoAppPhoenix.Todo.{Server}

#   def start_link() do
#     IO.puts("Starting todo cache")
#     DynamicSupervisor.start_link(name: __MODULE__, strategy: :one_for_one)
#   end

#   def child_spec(_arg) do
#     %{
#       id: __MODULE__,
#       start: {__MODULE__, :start_link, []},
#       type: :supervisor
#     }
#   end

#   def server_process(todo_list_name) do
#     case start_child(todo_list_name) do
#       {:ok, pid} -> pid
#       {:error, {:already_started, pid}} -> pid
#     end
#   end

#   def server_processes() do
#     processes = DynamicSupervisor.which_children(__MODULE__)
#     Enum.map(processes, fn x ->
#       case x do
#         {_id, child, _type, [Server]} -> Server.name(child)
#       end
#     end)
#   end

#   defp start_child(todo_list_name) do
#     DynamicSupervisor.start_child(__MODULE__, {Server, todo_list_name})
#   end

# end
