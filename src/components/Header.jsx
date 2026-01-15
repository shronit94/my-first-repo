const Header = () => {
  return (
    <div className="flex items-center px-6 pt-8 pb-4 justify-between sticky top-0 z-50 bg-background-dark/20 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="size-10 shrink-0 rounded-full border-2 border-primary/40 p-0.5 overflow-hidden">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-full w-full"
            style={{
              backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=Chef")`,
            }}
          />
        </div>
        <div>
          <h2 className="text-white text-sm font-bold leading-tight tracking-tight">
            Bonjour, Chef
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-premium-gold flex items-center gap-1">
            <span className="material-symbols-outlined !text-[12px]">workspace_premium</span>
            Premium
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex size-10 items-center justify-center rounded-full glass hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined text-white text-[20px]">notifications</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
