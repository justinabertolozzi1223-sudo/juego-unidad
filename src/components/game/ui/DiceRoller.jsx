export default function DiceRoller({ roll, onRoll }) {
  return (
    <div className="dice" onClick={onRoll}>
      {roll ?? "?"}
    </div>
  )
}