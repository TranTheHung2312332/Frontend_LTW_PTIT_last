/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */

import { useGlobalContext } from "../GlobalContext"

const BASE_URL = process.env.REACT_APP_BASE_URL

export function useFetchData() {
    const { setLoading } = useGlobalContext()

    return async function fetchData (fetchOption){

        setLoading(true)

        const option = fetchOption.option || {}    

        let response = await fetch(BASE_URL + fetchOption.endpoint, option)    

        if(response.status === 401){
            const refreshResponse = await fetch(BASE_URL + '/admin/refresh', {credentials: 'include'})

            const refreshJson = await refreshResponse.json()

            if(refreshJson.message === 'failed'){
                setLoading(false)
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userId')
                alert('Authentication error, please re - login')
                return window.location.reload()
            }
            else{
                localStorage.setItem('accessToken', refreshJson.data)
                option.headers['authorization'] = `Bearer ${refreshJson.data}`
                response = await fetch(BASE_URL + fetchOption.endpoint, option)
            }
        }

        const json = await response.json()

        setLoading(false)
        
        if(json.message === 'ok'){        
            fetchOption.success && fetchOption.success(json.data)
        }
        else{
            fetchOption.error && fetchOption.error(json.error)
        }

        return json

    }

}