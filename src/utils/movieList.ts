
export async function movieList(API: string, method: string ="GET", payload: any){    
    const send = method == "GET" ? {}: {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload) 
    }
    
    try{
        const res = await fetch(`${API}/sakila/movies`, {method, ...send})
        const data = await res.json()
        return data.movies
    }
    catch (err){
        return err
    }
}