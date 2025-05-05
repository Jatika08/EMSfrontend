import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export const LeavesChart = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "", "", "", ""],
    datasets: [
      {
        label: "Planned Leaves",
        data: [2, 1, 3, 1, 3, 2, 4, 5],
        borderColor: "#78716c",
        backgroundColor: "rgba(41, 37, 36, 0.2)",
        tension: 0.2,
        fill: true,
      },
      {
        label: "Casual Leaves",
        data: [0, 1, 1, 2, 0, 2, 1, 2],
        borderColor: "#d6d3d1",
        backgroundColor: "rgba(214, 211, 209, 0.2)",
        tension: 0.2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          color: "white",
          font: {
            size: 12,
            weight: "600",
            family: "'ubuntu', sans-serif",
          },
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg w-full text-stone-300 h-100">
      <div className="text-center mb-6">
        <div className="flex flex-row gap-1 font-semibold">
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300">
            Burn up
          </h2>
          <div className="ml-auto flex flex-row text-xs font-semibold gap-2">
            <div className="bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center">
              2W
            </div>
            <div className="bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center">
              1M
            </div>
            <div className="bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center">
              3M
            </div>
            <div className="bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center">
              Max
            </div>
          </div>
        </div>
        <div className="grid mt-4 text-stone-500 text-sm h-50">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
