defmodule TodoAppPhoenixWeb.PageController do
  use TodoAppPhoenixWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
