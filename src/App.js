
import './App.css';
import { Ant } from './components/ant'
import { useEffect, useRef, useState } from 'react';

function App() {
  const n = 200

  const [ants, setAnts] = useState([])
  const [log, setLog] = useState(0)
  
  const mousePos = useRef([10,10])
  const previusTimestamp = useRef(0)
  const requestFrameId = useRef()

  const height = window.innerHeight
  // cria as formigas
  useEffect(() => {
    const width = window.innerWidth ?? 0
    
    // const height = window.innerHeight
    setAnts([...new Array(n)].map(() => new Ant([width / 2, height / 2])))
  }, [])


  // funçao recursiva pra ir dando walk em todas as formigas no ritmo do navegador
  useEffect(() => {
    requestFrameId.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestFrameId.current)

  }, [])

  useEffect(() => {
    const handler = (e) => {
      mousePos.current = ([e.clientX, e.clientY])

    }
    window.addEventListener('mousemove', (e) => handler(e))

    return () => window.removeEventListener('mousemove', (e) => handler(e))

  }, [])

// anda com as formigas e agenda proximo frame
const update = (timestamp) => {
  if (previusTimestamp.current){
    const deltaT = timestamp - previusTimestamp.current 
    // console.log(deltaT)
    setAnts(ants => ants.map(ant => ant.walk(mousePos.current,deltaT,setLog)))
  }

  previusTimestamp.current = timestamp
  requestFrameId.current = requestAnimationFrame(update)
}


  return (
    <div className="App">
      <svg width='100%' height={height - 100}>
        {//formigas
        ants.map((a, i) => (
          <circle key={i} cx={a.position[0]} cy={a.position[1]} r='2' ></circle>
        ))}
        <circle fill='green' cx={mousePos.current[0]} cy={mousePos.current[1]} r='5' ></circle>
      </svg>
      <p>{log}</p>
    </div>
  );

}

export default App;
