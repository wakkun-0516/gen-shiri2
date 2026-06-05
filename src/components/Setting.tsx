import type { Rule, Rules } from '../App';

type Props = {
  onHandicap:boolean,
  player:number,
  rules:Rules,
  setRules:React.Dispatch<React.SetStateAction<Rules>>
}

function Setting({onHandicap,player,rules,setRules}:Props) {
    return(
        <div>
          {onHandicap && <h3>プレイヤー{player}</h3>}
          <div>
            持ち時間(秒)
            <input
              type='number'
              value={rules[player-1].timeLimit}
              onChange={(e) => {
                const newRules: [Rule, Rule] = [{...rules[0]},{...rules[1]}]
                newRules[player-1].timeLimit = Number(e.target.value)
                if (!onHandicap) {
                  newRules[player].timeLimit = Number(e.target.value)                
                }
                setRules(newRules)
              }}
            />
          </div>
          <div>
            最小の文字数(2以上)
            <input
              type='number'
              value={rules[player-1].minLength}
              onChange={(e) => {
                const newRules: [Rule, Rule] = [{...rules[0]},{...rules[1]}]
                newRules[player-1].minLength = Number(e.target.value)
                if (!onHandicap) {
                  newRules[player].minLength = Number(e.target.value)                
                }
                setRules(newRules)
              }}
            />
          </div>
          <div>
            最大の文字数(2以上)
            <input
              type='number'
              value={rules[player-1].maxLength}
              onChange={(e) => {
                const newRules: [Rule, Rule] = [{...rules[0]},{...rules[1]}]
                newRules[player-1].maxLength = Number(e.target.value)
                if (!onHandicap) {
                  newRules[player].maxLength = Number(e.target.value)                
                }
                setRules(newRules)
              }}
            />
          </div>
          <div>
            ライフライン
            <div>
              <button onClick={() => {
                const newRules: [Rule, Rule] = [{...rules[0]},{...rules[1]}]
                newRules[player-1].nmawashi = !newRules[player-1].nmawashi
                if (!onHandicap) {
                  newRules[player].nmawashi = !newRules[player].nmawashi
                }
                setRules(newRules)
              }}>ん回し</button>
              <button onClick={() => {
                const newRules: [Rule, Rule]= [{...rules[0]},{...rules[1]}]
                newRules[player-1].pass = !newRules[player-1].pass
                if (!onHandicap) {
                  newRules[player].pass = !newRules[player].pass
                }
                setRules(newRules)
              }}>パス</button>
              <button onClick={() => {
                const newRules: [Rule, Rule] = [{...rules[0]},{...rules[1]}]
                newRules[player-1].herashi = !newRules[player-1].herashi
                if (!onHandicap) {
                  newRules[player].herashi = !newRules[player].herashi
                }
                setRules(newRules)
              }}>文字数減らし</button>
            </div>
          </div>
        </div>
    )
}

export default Setting;