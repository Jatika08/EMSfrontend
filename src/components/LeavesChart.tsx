import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
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
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

// Parse date like "Wednesday, 16 Jul 2025" to Date
const parseDate = (str: string): Date =>
  new Date(Date.parse(str.replace(/^\w+,/, "").trim()));

// Generate all dates between two dates (inclusive)
const getDateRange = (start: Date, end: Date) => {
  const range: string[] = [];
  const d = new Date(start);
  while (d <= end) {
    range.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() + 1);
  }
  return range;
};

const getSelectedEmployeeLeaves = async (employeeId: string) => {
  const res = await axiosInstance.get(`/leaves/?id=${employeeId}`);
  return res.data;
};

const FILTER_OPTIONS = {
  "2W": 14,
  "1M": 30,
  "3M": 90,
  Max: 3650,
};

export const LeavesChart = () => {
  const [searchParams] = useSearchParams();
  const selectedEmployee = searchParams.get("employeeId") || "";
  const [filter, setFilter] = useState<keyof typeof FILTER_OPTIONS>("2W");

  const leaveDetails = useQuery({
    queryKey: ["leaveDetails", selectedEmployee],
    queryFn: () => getSelectedEmployeeLeaves(selectedEmployee),
    enabled: !!selectedEmployee,
  });

  const {
    labels,
    planned,
    casual,
  } = useMemo(() => {
    const daysBack = FILTER_OPTIONS[filter];
    const today = new Date();
    const start = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);

    const fullRange = getDateRange(start, today);
    const counts: Record<string, { CL: number; PL: number }> = {};
    fullRange.forEach((date) => {
      counts[date] = { CL: 0, PL: 0 };
    });

    leaveDetails.data?.forEach((leave: any) => {
      const startDate = parseDate(leave.start_date);
      const endDate = parseDate(leave.end_date);

      getDateRange(startDate, endDate).forEach((date) => {
        if (counts[date]) {
          if (leave.iscl) counts[date].CL += 1;
          else counts[date].PL += 1;
        }
      });
    });

    const labels = Object.keys(counts);
    const casual = labels.map((d) => counts[d].CL);
    const planned = labels.map((d) => counts[d].PL);

    return { labels, planned, casual };
  }, [leaveDetails.data, filter]);

  const data = {
    labels,
    datasets: [
      {
        label: "Planned Leaves",
        data: planned,
        borderColor: "#78716c",
        backgroundColor: "rgba(41, 37, 36, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Casual Leaves",
        data: casual,
        borderColor: "#d6d3d1",
        backgroundColor: "rgba(214, 211, 209, 0.2)",
        tension: 0.3,
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
        ticks: { color: "white", autoSkip: true, maxTicksLimit: 10 },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
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
            {Object.keys(FILTER_OPTIONS).map((key) => (
              <div
                key={key}
                onClick={() => setFilter(key as keyof typeof FILTER_OPTIONS)}
                className={`cursor-pointer bg-stone-800 rounded-md w-8 h-8 flex items-center justify-center hover:bg-stone-600 ${
                  filter === key ? "ring-2 ring-white" : ""
                }`}
              >
                {key}
              </div>
            ))}
          </div>
        </div>
        <div className="grid mt-4 text-stone-500 text-sm h-50">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
