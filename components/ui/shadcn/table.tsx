"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useCompanies from "@/lib/custom-hooks/useCompanies";


type CompanyDataType = {
    id: string
    name: string,
    description: string,
    location: string,
    website: string,
    revenue: number,
    employees: number
}

export function TableDemo() {
    const {data, loading, error} = useCompanies<CompanyDataType[]>()

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>{error}</p>
    }

    if(!data || data.length === 0) {
        return <p>No data available</p>
    }

    const calcRevenue = () => {
        return data.reduce((a, b) => a + b.revenue, 0)
    }

    const calcEmployees = () => {
        return data.reduce((a, b) => a + b.employees, 0)
    }


    return (
        <Table>
            <TableCaption>Company Details</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Employees</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.map((company) => (
                    <TableRow key={company.id}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.description}</TableCell>
                        <TableCell>{company.location}</TableCell>
                        <TableCell>{company.website}</TableCell>
                        <TableCell>{company.revenue}</TableCell>
                        <TableCell>{company.employees}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className='font-bold bg-gray-200 capitalize'>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell colSpan={2} />
                    <TableCell>{calcRevenue()}</TableCell>
                    <TableCell>{calcEmployees()}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
