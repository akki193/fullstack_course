const PersonForm = ({ onNameChange, onNumberChange, onPersonsAdd}) => {
  return (
    <form onSubmit={onPersonsAdd}>
      <div>
        name: <input onChange={onNameChange}/>
      </div>
      <div>
        number: <input onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={onPersonsAdd}>add</button>
      </div>
    </form>
  )
}

export default PersonForm