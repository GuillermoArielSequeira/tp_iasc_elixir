defmodule Todo.ListTest do
  use ExUnit.Case

  test "new" do
    list = Todo.List.new()

    assert list.auto_id == 1
    assert list.entries == %{}
  end

  test "add_entry" do
    list = Todo.List.new()
      |> Todo.List.add_entry("task 1")

    assert list.auto_id == 2
    assert Kernel.map_size(list.entries) == 1
  end

  test "entries" do
    empty_list = Todo.List.new()
    list = Todo.List.add_entry(empty_list, "task 1")

    assert Todo.List.entries(empty_list) == []
    assert Todo.List.entries(list) == [%Todo.Task{id: 1, name: "task 1", resolve?: false}]
  end

  test "find_by_id" do
    empty_list = Todo.List.new()
    list = Todo.List.add_entry(empty_list, "task 1")
    task = Todo.List.find_by_id(list, 1)

    assert task.id == 1
  end

  test "rename_entry" do
    list = Todo.List.new()
      |> Todo.List.add_entry("name")

      assert Todo.List.find_by_id(list, 1).name == "name"

    list = Todo.List.rename_entry(list, 1, "new_name")
    assert Todo.List.find_by_id(list, 1).name == "new_name"
  end

  test "resolve" do
    list = Todo.List.new()
      |> Todo.List.add_entry("name")

    assert Todo.List.find_by_id(list, 1).resolve? == false

    list = Todo.List.resolve_entry(list, 1)
    assert Todo.List.find_by_id(list, 1).resolve? == true
  end

  test "delete" do
    list = Todo.List.new()
      |> Todo.List.add_entry("entry_1")
      |> Todo.List.add_entry("entry_2")

    assert length(Map.to_list(list.entries)) == 2
    list = Todo.List.delete_entry(list, 1)
    assert length(Map.to_list(list.entries)) == 1
  end

end
