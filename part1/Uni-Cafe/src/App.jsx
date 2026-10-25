import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const Statistics = ({ total }) => {
  const all =  total.good + total.neutral + total.bad
  const average = (total.good - total.bad)/all
  const positive = total.good/all*100
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={average}/>
            <StatisticLine text='positive' value={positive}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleClick = (type) => {
    if (type === 'good') {
      const updatedGood = good + 1
      setGood(updatedGood)
      console.log('Good: ', updatedGood)
      setTotal({...total, good: updatedGood})

    }
    else if (type === 'neutral') {
      const updatedNeutral = neutral + 1
      setNeutral(updatedNeutral)
      console.log('Neutral: ', updatedNeutral)
      setTotal({...total, neutral: updatedNeutral})

    }
    else if (type === 'bad') {
      const updatedBad = bad + 1
      setBad(updatedBad)
      console.log('Bad: ', updatedBad)
      setTotal({...total, bad: updatedBad})

    }

    console.log('all: ', total.good + total.neutral + total.bad)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => handleClick('good')} text='good'/>
      <Button onClick={() => handleClick('neutral')} text='neutral'/>
      <Button onClick={() => handleClick('bad')} text='bad'/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics total={total}/>
    </div>
  )

}

export default App