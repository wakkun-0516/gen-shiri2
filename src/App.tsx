import Start from './components/Start'
import Settings from './components/Settings'
import Game from './components/Game'
import Result from './components/Result'
import { useState } from 'react'
import './App.css'

export type Rule = {
  timeLimit: number;
  minLength: number;
  maxLength: number;
  nmawashi: boolean;
  pass: boolean;
  herashi: boolean;
};

export type Rules = [Rule, Rule]

export type playerState = {
  time: number;
  nmawashi: boolean;
  pass: boolean;
  herashi: boolean;
  lengthList: number[]
  addLength:number
}

export type playerStates = [playerState, playerState]

function App() {
  const [step, setStep] = useState(0);

  const [rules, setRules] = useState<Rules>([
    {
      timeLimit: 300,
      minLength: 2,
      maxLength: 8,
      nmawashi: true,
      pass: true,
      herashi: true
    },
    {
      timeLimit: 300,
      minLength: 2,
      maxLength: 8,
      nmawashi: true,
      pass: true,
      herashi: true
    }
  ])

  const [playerStates, setPlayerStates] = useState<playerStates>([
    {
      time: rules[0].timeLimit,
      nmawashi: rules[0].nmawashi,
      pass: rules[0].pass,
      herashi: rules[0].herashi,
      lengthList: [],
      addLength:0
    },
    {
      time: rules[1].timeLimit,
      nmawashi: rules[1].nmawashi,
      pass: rules[1].pass,
      herashi: rules[1].herashi,
      lengthList: [],
      addLength:0
    }
  ])

  return (
    <div className='app'>
      <h1>限界しりとり</h1>
      {step === 0 && (
        <Start onNext={() => setStep(1)} />
      )}
      {step === 1 && (
        <Settings
          onNext={() => setStep(2)}
          rules={rules}
          setRules={setRules}
        />
      )}
      {step === 2 && (
        <Game onNext={() => setStep(3)}
          onStart={() => setStep(0)}
          playerStates={playerStates}
          setPlayerStates={setPlayerStates}
          rules={rules}
        />
      )}
      {step === 3 && (
        <Result
          onNext={() => setStep(0)}
          playerStates={playerStates}
        />
      )}
    </div>
  )
}

export default App;