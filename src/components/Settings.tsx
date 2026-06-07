import { useState } from 'react';
import type { Rules } from '../App';
import Setting from './Setting'

type Props = {
    onNext: () => void;
    rules:Rules;
    setRules: React.Dispatch<React.SetStateAction<Rules>>
};


function Settings({onNext,rules,setRules}:Props) {
  const [onHandicap,setOnHandicap] = useState<boolean>(false)

	return(
	  <div className='card'>
        <h2>ルール設定</h2>
        <label>
          <input 
            type='checkbox' 
            checked={onHandicap} 
            onChange={(e) => setOnHandicap(e.target.checked)}
          />
            ハンデを使用する
        </label>
        <Setting onHandicap={onHandicap} player={1} rules={rules} setRules={setRules}/>
        {onHandicap && <Setting onHandicap={onHandicap} player={2} rules={rules} setRules={setRules}/>}
        <button onClick={() => {
          onNext()
        }}>スタート</button>
      </div>
	)
}

export default Settings;