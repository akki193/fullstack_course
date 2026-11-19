import { useState } from 'react'

const CountryInfo = ({ country }) => {
    return (
        <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h1>Laungages</h1>
        <ul>
            {Object.entries(country.languages).map(([key, lang]) => {
                console.log(lang)
                
                return (<li key={key}>{lang}</li>)
                }
            )}
        </ul>            
        <img src={country.flags.png} alt='Country flag'/>
        </>
    )
}

const Country = ({ country }) => {
    const [show, setShow] = useState(false)

    


    if (show) {
        return (
            <>
            <CountryInfo country={country}/>
            <div><button onClick={() => setShow(!show)}>hide</button></div>
            
            </>
        )
    }
    else {
    return (
        <li>{country.name.common}<button onClick={() => setShow(!show)}>show</button></li>
    )
    }
}



const Display = ({ filterResults }) => {
    const resultsAmount = filterResults.length
    if (resultsAmount > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (resultsAmount <= 10 && resultsAmount > 1) {
        return (
            <ul>
                {filterResults.map(item => 
                <Country key={item.cca3} country={item}/>)}
            </ul>
        )
    }
    else if (resultsAmount === 1 ) {
        const country = filterResults[0]
        return (
            <>
            <CountryInfo country={country}/>
            </>
        )
    }
    else {
        return (
            <p>No matches, specify another filter</p>

        )

    }
}

export default Display