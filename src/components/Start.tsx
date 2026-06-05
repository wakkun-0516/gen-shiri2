type Props = {
    onNext: () => void;
};

function Start({onNext}:Props) {
    return (
      <div>
        <button onClick={onNext}>ゲームを始める</button>
      </div>
    )
}

export default Start;