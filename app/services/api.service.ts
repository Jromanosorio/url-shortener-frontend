const API_URL = process.env.API_URL

if (!API_URL) {
    throw new Error("API_URL is not defined");
}

export const shortURL = async (url: string) => {

    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ link: url }),
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) throw new Error("Error acortando el url");

    return response.json()
}
