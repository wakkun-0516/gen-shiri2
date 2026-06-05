type Props = {
    onNext: () => void;
    onStart: () => void;
};

function Game({onNext,onStart}:Props) {
    return(
      <div>
        <div>
          <div>
            <h2>プレイヤー1</h2>
            <p>残り 秒</p>
            <p>今までに引いた数</p>
          </div>
          <div>
            <h2>プレイヤー2</h2>
            <p>残り 秒</p>
            <p>今までに引いた数</p>
          </div>
        </div>
        <p>プレイヤー1の番です</p>
        <div>
          <p>使えるライフライン</p>
          <button>パス</button>
          <label>
            <input type='checkbox'/>ん回し
          </label>
          <label>
            <input type='checkbox'/>文字数減らし
          </label>
        </div>
        <p>文字数:4文字</p>
        <p>最初の文字:り</p>
        <p>ひらがな表示です</p>
        <input type='text'/>
        <input type='text' placeholder="回答してください"/>
        <button onClick={onNext}>回答</button>
        <button>再開</button>
        <button onClick={onStart}>ゲームをやめる</button>
      </div>
    )
}

export default Game;