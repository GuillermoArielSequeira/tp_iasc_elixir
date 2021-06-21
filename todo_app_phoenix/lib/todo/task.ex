defmodule Todo.Task do
  @derive Jason.Encoder
  defstruct id: nil, name: nil, resolve?: false

  def new(id, name) do
    %Todo.Task{id: id, name: name}
  end

  def rename(task, new_name) do
    Map.update(task, :name, task.name, fn _ -> new_name end)
  end

  def resolve(task) do
    Map.update(task, :resolve?, task.resolve?, fn _ -> true end)
  end
end
