import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonServices from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  const errorRule = {
        color: 'red',
        fontStyle: 'italic',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 6 
  }

  const notificationRule = {
        color: 'green',
        fontStyle: 'italic',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 6 
  }



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

    const personObject = {
      name: newName,
      number: newNumber
      }

    if (persons.some(person => person.name === newName)) {
      // alert(`Person ${newName} is already existing in phonebook`)

      const verification = confirm(
        `${newName} is already added to the ponebook, replace the old number with a new one?`
      )

      if (verification) {
        const id = persons.find(person => 
          person.name === newName
        ).id

        PersonServices
        .update(id, personObject)
        .then(
          setPersons(persons.map(person => 
            person.name === newName
            ? {...person, number: newNumber}
            : person
          ))
        )
        .then(() => {
          setNotificationStyle(notificationRule)
          setNotificationMsg(`${newName} phone number changed`)
          }
        )
        .catch(error => {
          console.log('error catched')
          
          setNotificationStyle(errorRule)
          setNotificationMsg(`Person ${newName} does not exist on server`)
          setPersons(persons.filter(person => 
            person.id !== id
          ))
        })

        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
      }
    }
    else {
      setNotificationMsg(`Added ${newName}`)
      setNotificationStyle(notificationRule)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)



      PersonServices
      .create(personObject)
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
      console.log(`deleting ${name}`)
      
      PersonServices
      .deleteEntry(id)
      .catch(error => {
        setNotificationStyle(errorRule)
        setNotificationMsg(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
      })

      setPersons(persons.filter(person => 
      person.id !== id))
      
      console.log("Persons: ", persons)
    
  }}


  


  return (
    <div>
      <h2>Phonebbok</h2>
      <Notification message={notificationMsg} msgStyle={notificationStyle}/>
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