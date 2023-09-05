import moment from "moment"

export const useQueryToString = (query: any = {}) => {
    let q = ""
    for (const key in query) {
        if (q == "") {
            q = `?${key}=${query[key]}`
        } else {
            q += `&${key}=${query[key]}`
        }
    }
    return q
}

export const useFormattedDate = (date: string | undefined, format = "YYYY-MM-DD HH:mm"): string => {
    return moment(date).format(format)
}

export const useNumberWithCommas = (number: number) => {
    if (number) {
        return number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ".")
    } else {
        return "0"
    }
}