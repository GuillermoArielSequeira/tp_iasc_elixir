defmodule TodoAppPhoenixWeb.TodoChannel do
  use Phoenix.Channel

  def join("todo", _message, socket) do
    {:ok, socket}
  end

end
