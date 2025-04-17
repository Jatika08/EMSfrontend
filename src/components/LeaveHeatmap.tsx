export const LeaveHeatMap = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col w-full h-128 gap-4 p-4 bg-stone-950/60 border border-stone-700/40 rounded-2xl shadow-md backdrop-blur-md">
        <i className="text-lg font-semibold text-stone-400">Leaves Heatmap</i>
        <div className="flex flex-row gap-2 h-full">
          <div className="flex w-110 p-2 bg-stone-900 h-full rounded-2xl text-sm text-stone-400">
            <span>January</span>
            <span>10</span>
          </div>
          <div className="flex w-110 p-2 bg-stone-900 h-full rounded-2xl text-sm text-stone-400">
            <span>Feburary</span>
            <span>10</span>
          </div>
          <div className="flex w-110 p-2 bg-stone-900 h-full rounded-2xl text-sm text-stone-400">
            <span>March</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
