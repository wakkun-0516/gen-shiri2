import Start from './components/Start'
import Settings from './components/Settings'
import Game from './components/Game'
import Result from './components/Result'
import {useState} from 'react'

export type Rule = {
  timeLimit: number;
  minLength:number;
  maxLength:number;
  nmawashi:boolean;
  pass:boolean;
  herashi:boolean;
};

export type Rules = [Rule,Rule]

function App() {
  const [step,setStep] = useState(0);

  const [rules,setRules] = useState<Rules>([
    {
      timeLimit:300,
      minLength:2,
      maxLength:8,
      nmawashi:true,
      pass:true,
      herashi:true
    },
    {
      timeLimit:300,
      minLength:2,
      maxLength:8,
      nmawashi:true,
      pass:true,
      herashi:true
    }
  ])

  return (
    <div>
      <h1>限界しりとり</h1>
      {step === 0 && (
        <Start onNext={() => setStep(1)}/>
      )}
      {step === 1 && (
        <Settings 
          onNext={() => setStep(2)}
          rules={rules}
          setRules={setRules}
        />
      )}
      {step === 2 && (
        <Game onNext={() => setStep(3)} onStart={() => setStep(0)}/>
      )}
      {step === 3 && (
        <Result onNext={() => setStep(0)}/>
      )}
    </div>
  )
}

export default App;