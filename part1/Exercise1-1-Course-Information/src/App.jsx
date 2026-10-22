const Header = (props) => {
    console.log("Header", props)

    return (
        <>
        <p>
            {props.course}
        </p>
        </>
    )
}

const Content = (props) => {
    console.log("Content", props)

    return (
        <>
        <p>{props.part1} {props.exercise1}</p>
        <p>{props.part2} {props.exercise2}</p>
        <p>{props.part3} {props.exercise3}</p>
        </>
    )
}

const Total = (props) => {
    console.log("Total", props)

    const total = props.exercise1 + props.exercise2 + props.exercise3

    return (
        <>
        <p>Number of exercises {total}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercise1 = 10
    const part2 = 'Using props to pass data'
    const exercise2 = 7
    const part3 = 'State of a component'
    const exercise3 = 14

    return (
    <div>
        <Header course={course}/>
        <Content 
            part1={part1} part2={part2} part3={part3} 
            exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}
        />
        <Total 
            exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}
        />

    </div>
    )
}

export default App