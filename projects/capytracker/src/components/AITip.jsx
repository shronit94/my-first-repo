const AITip = ({ tip }) => {
  return (
    <div className="px-6 mb-4">
      <div className="glass rounded-2xl p-4 flex gap-4 items-center">
        <div className="size-10 shrink-0 rounded-xl bg-premium-gold/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-premium-gold !text-[20px]">
            auto_awesome
          </span>
        </div>
        <div>
          <p className="text-white/90 text-sm leading-snug">
            <span className="font-bold text-premium-gold">AI Tip:</span> {tip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AITip;
