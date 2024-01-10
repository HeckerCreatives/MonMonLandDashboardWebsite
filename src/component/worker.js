const migrate = () => {
    onmessage = (e) => {
    
        fetch(`${process.env.REACT_APP_API_URL}gameusers/migrationdata`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.data[0],
                password: e.data[1],
                playfabToken: e.data[2],
                thetime: e.data[3],
                referral: e.data[4],
            })
        })
        .then(result => result.json())
        .then(data => {
            postMessage([data.message,data.data])
        })
    };
}

let code = migrate.toString()
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))
const blob = new Blob([code], { type: 'application/javascriptssky' })
const workerScript = URL.createObjectURL(blob)
module.exports = workerScript;