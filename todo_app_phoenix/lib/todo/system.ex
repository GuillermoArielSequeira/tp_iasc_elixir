defmodule Todo.System do

  def start_link() do
    Supervisor.start_link(
      [
        Todo.ProcessRegistry,
        Todo.Cache
      ],
      strategy: :one_for_one
    )
  end

  def child_spec(_arg) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, []},
      type: :supervisor
    }
  end

end
