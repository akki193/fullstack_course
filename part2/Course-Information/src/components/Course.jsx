const Part = (props) => {
    console.log("Part:", props)
    const { part } = props

    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Header = (props) => {
    console.log("Header", props)
    const { course } = props

    return (
        <h2>
            {course.name}
        </h2>
    )
}

const Content = (props) => {
    console.log("Content", props)
    const { course } = props

    return (
        <>
        {course.parts.map((part, i) => 
            <Part key={i} part={part}/>
        )}
        </>
    )
}

const Total = (props) => {
    console.log("Total", props)
    const { course } = props

    const total = course.parts.reduce((acc, cur) => acc+cur.exercises, 0)

    return (
        <>
        <h4>Total of {total} exercises</h4>
        </>
    )
}

const Course = (props) => {
    console.log("Course", props)
    const { course } = props

    return (
    <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </div>
    )
}

export default Course