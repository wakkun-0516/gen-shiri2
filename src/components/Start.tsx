

type Props = {
  onNext: () => void;
};

function Start({ onNext }: Props) {
  return (
    <div className="card">
      <button onClick={onNext}>ゲームを始める</button>
    </div>
  )
}

export default Start;