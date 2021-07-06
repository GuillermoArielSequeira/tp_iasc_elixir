defmodule Todo.TaskTest do
  use ExUnit.Case

  test "new" do
    task = Todo.Task.new(1, "new task")

    assert false == task.resolve?
    assert "new task" == task.name
  end

  test "rename" do
    task = Todo.Task.new(1, "new task")
    renamed_task = Todo.Task.rename(task, "renamed task")

    assert task.name != renamed_task.name
    assert task.resolve? == renamed_task.resolve?
  end

  test "resolve" do
    task = Todo.Task.new(1, "new task")
    resolved_task = Todo.Task.resolve(task)

    assert true == resolved_task.resolve?
  end
end
