import Filter from './components/Filter'
import Display from './components/Display'

import countriesServices from './services/countries'


import { useState, useEffect } from 'react'


const App = () => {
  const [filterValue, setFilterValue] = useState('')
  const [filterResults, setFilterResults] = useState([])
  const [countries, setCountries] = useState([])

  

  useEffect(() => {
    console.log('Rerenderred')

    countriesServices
    .getAll()
    .then(response => setCountries(response))

  }, [])

  const handleFilterChange = (event) => {
    console.log('Filter value:', event.target.value)
    
    const newFilterValue = event.target.value
    setFilterValue(newFilterValue)

    console.log('countries: ', countries)
    

    const newFilterResults = countries.filter(country => {
      const name = country.name.common

      return name.toLowerCase().includes(newFilterValue.toLowerCase())      
    })

    setFilterResults(newFilterResults)
    console.log('Filter results: ', newFilterResults)
  }


  return (
    <>
    <Filter 
    filterValue={filterValue}
    handleFilterChange={handleFilterChange}
    />
    <Display filterResults={filterResults}/>
    </>
  )
}

export default App