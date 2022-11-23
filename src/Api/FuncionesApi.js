let API = process.env.REACT_APP_API;
let TOKEN = process.env.REACT_APP_API_TOKEN;

const getMovies = async (route) => {
    try {
        
        const response = await fetch( `${API}${route}`,{
            headers:{
                Authorization: 
                `Bearer ${TOKEN}` ,
                "Content-Type": "application/json;charset=utf-8"
            }
        })

        if (response.ok) {
            const data = await response.json()
            return data;
        }else{
            console.log(response);
        };

    } catch (e) {
       throw e
    };
}

export {
    getMovies,
}