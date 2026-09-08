import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-7xl font-bold tracking-tighter">404</h1>
      <p className="max-w-md text-center text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium transition-opacity hover:opacity-90"
      >
        Go Home
      </button>
    </div>
  )
}

export default NotFound
