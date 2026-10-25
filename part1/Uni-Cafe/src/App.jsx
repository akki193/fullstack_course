import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, value }) => <p>{text} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log('Good: ', updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log('Neutral: ', updatedNeutral)
  }
  
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log('Bad: ', updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Display text='good' value={good}/>
      <Display text='neutral' value={neutral}/>
      <Display text='bad' value={bad}/>

    </div>
  )

}

export default App