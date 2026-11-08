import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonServices from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    PersonServices.getAll().then(initPersons => {
      setPersons(initPersons)
    }
    )
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) => {
    console.log('Name changing: ', event.target.value)

    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Number changing: ', event.target.value)

    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target)

    if (persons.some(person => person.name === newName)) {
      // alert(`Person ${newName} is already existing in phonebook`)

      const verification = confirm(
        `${newName} is already added to the ponebook, replace the old number with a new one?`
      )

      if (verification) {
        console.log('here')
        
        setPersons(persons.map(person => 
          person.name === newName 
            ? {...person, number: newNumber}
            : person
        ))
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }


      PersonServices
      .update(personObject)
      .then(person => setPersons(persons.concat(person)))
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePersonOF = (id) => {
    const name = persons.find(person => person.id === id).name
    const verification = confirm(`Delete ${name}?`)

    
    if (verification) {
      PersonServices
      .deleteEntry(id)
      .then(() => {
        setPersons(persons.filter(person => 
          person.id !== id
        )
        )
      })
    }
    console.log("Persons: ", persons)
    
  }


  


  return (
    <div>
      <h2>Phonebbok</h2>
      <Filter onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
      onNameChange={handleNameChange} 
      onNumberChange={handleNumberChange}
      onPersonsAdd={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePersonOF}/>
    </div>
  )
}

export default App