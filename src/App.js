
import './App.css';
import { Ant } from './components/ant'
import { useEffect, useState } from 'react';

function App() {
  const n = 1

  const [ants, setAnts] = useState([])
  const [pos, setPos] = useState([0,0])
  const [log,setLog] = useState(0)
  const height = window.innerHeight


  useEffect(() => {
    const width = window.innerWidth ?? 0
    // const height = window.innerHeight
    setAnts([...new Array(n)].map(() => new Ant([width / 2, height / 2])))

    
  }, [])
  
// funçao recursiva pra ir dando walk em todas as formigas no ritmo do navegador
  useEffect(() => {
    let otherAnimation
    const update = () => requestAnimationFrame(()=>{
      setAnts(ants=>ants.map(ant => ant.walk(pos)))
      otherAnimation = requestAnimationFrame(update)
    })
    console.log(otherAnimation)
    const animationId = update()


    return () => {cancelAnimationFrame(animationId);cancelAnimationFrame(otherAnimation)}
  },[pos])

  useEffect(()=>{
    const handler = (e)=>{
      setPos([e.clientX,e.clientY])

    }
    window.addEventListener('mousedown',(e)=>handler(e))
    
    return () => window.removeEventListener('mousedown',(e)=>handler(e))
    
  },[])


  return (
    <div className="App">
      <svg width='100%' height={height-100}>
        {ants.map((a, i) => (
          <circle key={i} cx={a.position[0]} cy={a.position[1]} r='5' ></circle>
          ))}
          <circle fill='green' cx={pos[0]} cy={pos[1]} r='5' ></circle>
      </svg>
          <p>{log}</p>
    </div>
  );

}

export default App;
