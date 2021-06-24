defmodule TodoAppPhoenixWeb.Router do
  use TodoAppPhoenixWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TodoAppPhoenixWeb do
    pipe_through :browser

    get "/", PageController, :index
    get("/about", PageController, :index)
  end

  scope "/api", TodoAppPhoenixWeb do
    pipe_through :api

    get "/:list/entries", TodoController, :entries
    post "/:list", TodoController, :add_entry
    patch "/:list/:entry_id", TodoController, :rename_entry
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: TodoAppPhoenixWeb.Telemetry
    end
  end
end
