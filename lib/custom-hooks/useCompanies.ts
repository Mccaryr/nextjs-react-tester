"use client"
import {useEffect, useState} from "react";



function useCompanies<T> () {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`https://venefish.enesien.com/api/companies`)
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const result = await response.json();
            setData(result)
        } catch (err) {
            alert((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {data, loading, error}
}

export default useCompanies