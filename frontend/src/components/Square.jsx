const Square = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-4xl font-bold text-white hover:scale-105 transition-all duration-300"
    >
      {value}
    </button>
  );
};

export default Square;