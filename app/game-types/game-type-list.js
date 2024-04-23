export default function GameTypes({ games, onClick }) {
  return (
    <div className="flex items-center pl-6 pr-6 m-4 h-12 max-w-52 hover:bg-green-600 hover-grow bg-slate-800 rounded-3xl">
      <button onClick={onClick}>
        <p className="text-center text-lg capitalize">{games}</p>
      </button>
    </div>
  );
}
