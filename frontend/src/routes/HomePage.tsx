import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HomePage() {
  return (
    <>
      <h1 className="sr-only">Biobank Portal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Biobank Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Portal for managing sensitive data in BBMRI.cz biobanks.</p>
        </CardContent>
      </Card>
    </>
  )
}
