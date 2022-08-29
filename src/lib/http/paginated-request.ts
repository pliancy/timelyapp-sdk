import type { AxiosInstance } from 'axios'

export const paginatedRequest = async (
    httpAgent: AxiosInstance,
    route: string,
    filter?: { [index: string]: any },
    per_page = 1000,
): Promise<any[]> => {
    const params = {
        per_page,
        page: 1,
    }

    if (filter) Object.assign(params, { ...filter })

    const finalData = []
    let res: any[] = []

    do {
        const { data } = await httpAgent.get(route, { params })
        finalData.push(...data)
        res = data
        params.page++
        /// If the results are less than per_page, we can assume there are no more results
    } while (res.length === per_page)

    return finalData
}
