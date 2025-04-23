import { useEffect, useState } from "react"


export const useFirestore = (collection: any) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        collection.then((data: any) => {
            setData(data)
            setLoading(false)
        }).catch((error: string) => {
            setError(error)
        })
    }, [])

    return [data, loading, error]
}