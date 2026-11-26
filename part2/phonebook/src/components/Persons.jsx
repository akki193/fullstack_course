const Person = ({ person, deletePerson }) => {
    return (
        <li>
        {person.name} {person.number}
        <button onClick={deletePerson}>delete</button>
        </li>
    )
}

const Persons = ({ persons, filter, deletePerson }) => {
    const filterByOccur = (items, substr) => 
        items.filter(item => 
        item.name.includes(substr)
        )
    

    return (
        <ul>
            {filterByOccur(persons, filter).map(person => 
                <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>
            )}
        </ul>
    )
}

export default Persons