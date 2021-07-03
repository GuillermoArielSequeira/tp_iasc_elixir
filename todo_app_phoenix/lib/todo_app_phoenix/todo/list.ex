defmodule TodoAppPhoenix.Todo.List do
  @derive Jason.Encoder
  defstruct auto_id: 1, entries: %{}

  alias TodoAppPhoenix.Todo.{List, Task}

  def new() do
    %List{}
  end

  def add_entry(todo_list, name) do
    entry = Map.put(Task.new(todo_list.auto_id, name), :id, todo_list.auto_id)
    new_entries = Map.put(todo_list.entries, todo_list.auto_id, entry)

    %List{todo_list |
      entries: new_entries,
      auto_id: todo_list.auto_id + 1
    }
  end

  def entries(todo_list) do
    Map.values(todo_list.entries)
  end

  def find_by_id(todo_list, id) do
    case Map.fetch(todo_list.entries, id) do
      :error -> %{}
      {:ok, entry} -> entry
    end
  end

  def delete_entry(todo_list, id) do
    new_entries = Map.delete(todo_list.entries, id)

    %List{todo_list |
      entries: new_entries,
      auto_id: todo_list.auto_id
    }
  end

  def rename_entry(todo_list, id, new_name) do
    update_entry(
      todo_list,
      id,
      fn entry -> Task.rename(entry, new_name) end
    )
  end

  def resolve_entry(todo_list, id) do
    update_entry(
      todo_list,
      id,
      fn entry ->
        Map.update(entry, :resolve?, entry.resolve?, fn _ -> true end)
      end
    )
  end

  defp update_entry(todo_list, id, updater_fun) do
    case Map.fetch(todo_list.entries, id) do
      :error -> todo_list
      {:ok, old_entry} ->
        new_entry = updater_fun.(old_entry)
        new_entries = Map.put(todo_list.entries, new_entry.id, new_entry)
        %List{todo_list | entries: new_entries}
    end
  end

end
