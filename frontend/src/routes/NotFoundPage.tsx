import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to="/" className="font-medium text-primary underline-offset-4 hover:underline">
        Back to home
      </Link>
    </div>
  )
}
