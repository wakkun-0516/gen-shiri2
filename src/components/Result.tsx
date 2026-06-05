type Props = {
    onNext: () => void;
};

function Result({onNext}:Props) {
    return(
      <div>
        <h2>時間切れ・・・</h2>
        <h3>結果:プレイヤー2の勝ち!</h3>
        <p>プレイヤー1の残り時間:</p>
        <p>プレイヤー2の残り時間:</p>
        <button onClick={onNext}>タイトルに戻る</button>
      </div>
    )
}

export default Result;