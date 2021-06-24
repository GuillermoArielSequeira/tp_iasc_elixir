defmodule Todo.CacheTest do
  use ExUnit.Case

  test "server_process" do
    list = Todo.Cache.server_process("list")

    assert list != Todo.Cache.server_process("another_list")
    assert list == Todo.Cache.server_process("list")
  end

end
