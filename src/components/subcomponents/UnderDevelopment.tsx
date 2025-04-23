import { Construction } from "lucide-react";

export const UnderDevelopment = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-0 text-center">
      <Construction size={48} className="text-amber-500" />
      <h1 className="text-2xl font-bold text-stone-200">Under Development</h1>
      <i className="text-lg text-stone-400">
        This feature is currently under development.
      </i>
      <i className="text-lg text-stone-400">Please check back later.</i>
    </div>
  );
};
