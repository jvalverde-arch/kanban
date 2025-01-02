import { FlightsTable } from "@/components/flights/flights-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FlightsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#002856]">
            Administración de vuelos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FlightsTable />
        </CardContent>
      </Card>
    </div>
  )
}

