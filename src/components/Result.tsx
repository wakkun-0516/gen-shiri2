import type { playerStates } from "../App";

type Props = {
    onNext: () => void;
    playerStates:playerStates
};

function Result({onNext,playerStates}:Props) {
    return(
      <div className="card">
        <h2>時間切れ・・・</h2>
        <h3>結果:プレイヤー{playerStates[0].time === 0 ? '2' : '1'}の勝ち!</h3>
        <p>プレイヤー1の残り時間:{playerStates[0].time}</p>
        <p>プレイヤー2の残り時間:{playerStates[1].time}</p>
        <button onClick={onNext}>タイトルに戻る</button>
      </div>
    )
}

export default Result;