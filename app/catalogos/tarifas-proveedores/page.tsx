import { ProviderRatesTable } from "@/components/provider-rates-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProviderRatesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#002856]">
            Tarifas de Proveedores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProviderRatesTable />
        </CardContent>
      </Card>
    </div>
  )
}

