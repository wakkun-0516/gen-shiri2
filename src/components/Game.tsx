import { type playerStates , type Rules} from '../App';
import { useState, useEffect } from 'react';

type Props = {
    onNext: () => void;
    onStart: () => void;
    playerStates: playerStates
    setPlayerStates: React.Dispatch<React.SetStateAction<playerStates>>
    rules:Rules;
};

function Game({ onNext, onStart,playerStates,setPlayerStates,rules }: Props) {
    const [turn, setTurn] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const [composing, setComposing] = useState('');
    const [ansText, setAnsText] = useState('');
    const [usedWords,setUsedWords] = useState<string[]>([])
    const [checkedNmawashi,setCheckedNmawashi] = useState(false)
    const [checkedHerashi,setCheckedHerashi] = useState(false)

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setPlayerStates((prev) => {
                const newState:playerStates = [{...prev[0]},{...prev[1]}]
                newState[turn].time = newState[turn].time-1
                return newState;
            });
        },1000);
        return () => clearInterval(timer);
    }, [turn,isPaused]);

    useEffect(() => {
        if (playerStates[0].time <= 0 || playerStates[1].time <= 0) {
            onNext();
        }
    }, [playerStates]);

    const getRequestLen = (turn:number) => {
        const max = rules[turn].maxLength
        const min = rules[turn].minLength
        return Math.floor(Math.random()*(max-min+1)+min+playerStates[turn].addLength)
    }

    const getHead = (text:string) => {
        if (checkedNmawashi) {
            text = text.slice(0,-1)
        }

        let head
        if (text[text.length-1] !== 'ー')
        {
            head = text[text.length-1]
        }else{
            head = text[text.length-2]
        }

        return head
            .replace(/ぁ/g, "あ")
            .replace(/ぃ/g, "い")
            .replace(/ぅ/g, "う")
            .replace(/ぇ/g, "え")
            .replace(/ぉ/g, "お")
            .replace(/っ/g, "つ")
            .replace(/ゃ/g, "や")
            .replace(/ゅ/g, "ゆ")
            .replace(/ょ/g, "よ")
            .replace(/ゎ/g, "わ");
    }
    

    async function inWiki(word: string) {
        const url = `https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(word)}&format=json&origin=*`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.query.search.length === 0){
            return false;
        }
        if (data.query.search[0].title === word){
            return true
        }else{
            return false
        }
    }

    const [requestLen, setRequestLen] = useState(getRequestLen(0))
    const [requestHead,setRequestHead] = useState('り')

    const answer = async() => {
        if (composing.length < 2){
            alert('2文字以上の言葉を入力してください')
            return;
        }

        if (composing.length !== requestLen && !checkedHerashi) {
            alert(`${requestLen}文字の言葉を入力してください`);
            return;
        }

        if (composing.length >= requestLen && checkedHerashi) {
            alert(`${requestLen}文字以上の言葉に対して文字数減らしを使うことはできません`);
            return;
        }

        if (composing[0] !== requestHead){
            alert(`${requestHead}から始まる言葉を入力してください`);
            return;
        }

        if (composing[composing.length-1] === 'ん' && !checkedNmawashi){
            alert(`「ん」で終わる言葉は使えません`);
            return;
        }

        if (composing[composing.length-1] !== 'ん' && checkedNmawashi){
            alert(`「ん」で終わる言葉ではないので、ん回しは使えません`);
            return;
        }

        if (usedWords.includes(composing)){
            alert(`${composing}は既に使った言葉です`)
            return;
        }

        if (!(await inWiki(ansText))){
            if (!confirm(`${ansText}は見つかりませんでした。\n合意の下で続けますか?`)){
                return;
            }
        }

        setCheckedHerashi(false)
        setCheckedNmawashi(false)
        setRequestHead(getHead(composing))
        const next = getRequestLen(1-turn)
        setRequestLen(next)
        setUsedWords([...usedWords,composing])

        //引いた数の一覧・ん回し・文字数減らし・追加の文字数を更新
        const newStates:playerStates = [{...playerStates[0]},{...playerStates[1]}]
        newStates[1-turn].lengthList.push(next-playerStates[1-turn].addLength)
        if (checkedHerashi){
            newStates[turn].herashi = false
        }
        if (checkedNmawashi){
            newStates[turn].nmawashi = false
        }
        newStates[turn].addLength = Math.max(0,requestLen-composing.length)
        setPlayerStates(newStates)       

        
        setAnsText('')
        setComposing('')
        setTurn(1-turn)
    }

    useEffect(() => {
        setPlayerStates([
            {
              time:rules[0].timeLimit,
              nmawashi:rules[0].nmawashi,
              pass:rules[0].pass,
              herashi:rules[0].herashi,
              lengthList:[requestLen],
              addLength:0
            },
            {
              time:rules[1].timeLimit,
              nmawashi:rules[1].nmawashi,
              pass:rules[1].pass,
              herashi:rules[1].herashi,
              lengthList:[],
              addLength:0
            }
          ])
    },[])

        return (
            <div className='card'>
                <div className='players'>
                    <div className='player-card'>
                        <h2>プレイヤー1</h2>
                        <p>残り{playerStates[0].time}秒</p>
                        <p>今までに引いた数:{playerStates[0].lengthList.join(',')}</p>
                    </div>
                    <div className='player-card'>
                        <h2>プレイヤー2</h2>
                        <p>残り{playerStates[1].time}秒</p>
                        <p>今までに引いた数:{playerStates[1].lengthList.join(',')}</p>
                    </div>
                </div>
                <p className='turn-text'>プレイヤー{turn+1}の番です</p>
                <div className='lifeline'>
                    <p>使えるライフライン</p>
                    <div className='lifeline-options'>
                        {playerStates[turn].pass && 
                            <button onClick={() => {
                                const next = getRequestLen(1-turn)
                                setRequestLen(next)
                                //引いた数の一覧・ん回し・文字数減らし・追加の文字数を更新
                                const newStates:playerStates = [{...playerStates[0]},{...playerStates[1]}]
                                newStates[1-turn].lengthList.push(next-playerStates[1-turn].addLength)
                                newStates[turn].pass = false
                                setPlayerStates(newStates)
                                
                                setAnsText('')
                                setComposing('')
                                setTurn(1-turn)
                            }}
                            >パス
                            </button>
                        }
                        {playerStates[turn].nmawashi && 
                            <label>
                                <input 
                                    type='checkbox' 
                                    checked={checkedNmawashi}
                                    onChange={(e) => setCheckedNmawashi(e.target.checked)}
                                />ん回し
                            </label>
                        }
                        {playerStates[turn].herashi &&
                            <label>
                                <input 
                                    type='checkbox' 
                                    checked={checkedHerashi}
                                    onChange={(e) => setCheckedHerashi(e.target.checked)}
                                />文字数減らし
                            </label>
                        }
                    </div>
                </div>
                <div className='game-info'>
                    <p>文字数:{
                        requestLen-playerStates[turn].addLength+
                        (playerStates[turn].addLength !== 0 ? `+${playerStates[turn].addLength}` : '')
                    }文字</p>
                <p>最初の文字:{requestHead}</p>
                </div>
                <div className='answer-area'>
                    <p>ひらがな表示です</p>
                    <input
                        type='text' 
                        value={composing}
                        onChange={(e) => setComposing(e.target.value)}
                    />
                    <input
                        type='text'
                        value={ansText}
                        placeholder="回答してください"
                        onChange={(e) => setAnsText(e.target.value)}
                        onCompositionUpdate={(e) => {
                            const hasNotHiragana = /[^ぁ-んー]/.test(e.currentTarget.value);
                            if (!hasNotHiragana){
                                setComposing(e.currentTarget.value)
                            }
                        }}
                    />
                    <div className='button-group'>
                        <button onClick={answer}>回答</button>
                        <button onClick={() => setIsPaused(!isPaused)}>{isPaused ? '再開' : '一時停止'}</button>
                        <button onClick={onStart}>ゲームをやめる</button>
                    </div>
                </div>
            </div>
        )
    }

export default Game;