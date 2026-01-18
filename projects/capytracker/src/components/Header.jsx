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
