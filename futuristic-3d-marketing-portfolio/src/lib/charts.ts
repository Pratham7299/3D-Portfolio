import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
);

ChartJS.defaults.font.family = "'Manrope', ui-sans-serif, system-ui, sans-serif";
ChartJS.defaults.font.size = 11;
ChartJS.defaults.color = "#9fb0d8";

export const chartTooltip = {
  backgroundColor: "rgba(6,10,26,0.94)",
  borderColor: "rgba(140,170,255,0.28)",
  borderWidth: 1,
  padding: 12,
  cornerRadius: 10,
  titleColor: "#eef3ff",
  titleFont: { family: "'JetBrains Mono', monospace", size: 10, weight: 700 as const },
  bodyColor: "#c3d2f5",
  bodyFont: { size: 12 },
  displayColors: true,
  boxWidth: 8,
  boxHeight: 8,
  boxPadding: 4,
};

export const gridStyle = {
  color: "rgba(140,170,255,0.1)",
  drawTicks: false,
};

export function areaGradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }, hex: string) {
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, `${hex}66`);
  g.addColorStop(0.55, `${hex}1f`);
  g.addColorStop(1, `${hex}00`);
  return g;
}
