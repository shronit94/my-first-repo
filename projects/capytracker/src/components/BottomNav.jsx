const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent pointer-events-none">
      <div className="glass h-16 rounded-2xl flex items-center justify-around px-4 pointer-events-auto">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            home
          </span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
          <span className="material-symbols-outlined">bookmark</span>
          <span className="text-[10px] font-bold">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] font-bold">Groceries</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold">Account</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
