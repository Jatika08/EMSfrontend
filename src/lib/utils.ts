import { LeaveWfh } from "@/utils/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colors = ["#333333", "#555555", "#464444"];

export function SegregateLeaves(month: number, year: number, data: LeaveWfh[]) {
  console.log(month, year, data);
  const daysInThisMonth = getDaysInMonth(month, year);

  const days: (LeaveWfh & {
    position: number;
    isStart: boolean;
    isEnd: boolean;
    color: string;
  })[][] = Array.from({ length: daysInThisMonth }, () => []);

  console.log(data);
  const SortedColouredLeaves = data
    .map((item) => ({
      ...item,
      color: item?.isWfh ? colors[0] : item?.isCl ? colors[1] : colors[2],
    }))
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

  SortedColouredLeaves.forEach((item) => {
    let start = new Date(item.start_date).getDate();

    if (new Date(item.start_date).getMonth() !== month) {
      start = 0;
    }

    let end = new Date(item.end_date).getDate();

    if (new Date(item.end_date).getMonth() !== month) {
      end = daysInThisMonth - 1;
    }

    let position = 0;
    while (days[start][position] !== undefined) {
      position++;
    }

    for (let d = start; d <= end; d++) {
      if (!days[d]) {
        days[d] = [];
      }

      days[d][position] = {
        ...item,
        position,
        isStart: d === start,
        isEnd: d === end,
        color: item.color,
      };
    }
  });

  return days.map(fillMissingPositions);
}

const fillMissingPositions = (
  group: (LeaveWfh & {
    position: number;
    isStart: boolean;
    isEnd: boolean;
    color: string;
  })[]
) => {
  const clean = group
    .flat()
    .filter(
      (item) =>
        item && typeof item === "object" && typeof item.position === "number"
    );

  if (clean.length === 0) return [];

  if (clean.length === 1) {
    const { position } = clean[0];
    const emptyCount = Math.max(0, position);
    return [...Array(emptyCount).fill({}), clean[0]];
  }

  const sorted = clean.sort((a, b) => a.position - b.position);
  const filled = [];

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    filled.push(current);

    const next = sorted[i + 1];
    if (next) {
      const gap = next.position - current.position - 1;
      for (let j = 0; j < gap; j++) {
        filled.push({});
      }
    }
  }

  return filled;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
