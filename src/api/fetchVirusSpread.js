function fetchVirusSpread() {
    return fetch(process.env.REACT_APP_VIRUS_MAIN_URL).then((response) => (response.json())).then((data) => {
        console.log(data);
        return [];
    });
}

export default fetchVirusSpread;