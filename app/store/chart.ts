import create from "zustand";

type LinePointData = number | string | Date;

type LineChartDatum = {
  x: LinePointData;
  y: LinePointData;
};

type LineChartData = {
  id: string;
  data: Array<LineChartDatum>;
};

type LineChartStateData = {
  [key: string]: LineChartData;
};

type ChartState = {
  inProgress: boolean;
  inputValue: string;
  chartData: LineChartStateData;
  toggleProgress: Function;
  updateInputValue: Function;
  updateChartData: Function;
};

const useChartStore = create<ChartState>((set) => ({
  inProgress: false,
  inputValue: "",
  chartData: {},
  toggleProgress: () =>
    set((state) => ({ ...state, inProgress: !state.inProgress })),
  updateInputValue: (value: string) =>
    set((state) => ({ ...state, inputValue: value })),
  updateChartData: (chartId: string, y: LinePointData) =>
    set((state) => {
      const { chartData } = state;
      if (chartData[chartId]) {
        const { id, data } = chartData[chartId];
        return {
          ...state,
          chartData: {
            ...chartData,
            [id]: {
              id,
              data: [...data, { y, x: data.length + 1 }],
            },
          },
        };
      }
      return {
        ...state,
        chartData: {
          ...chartData,
          [chartId]: {
            id: chartId,
            data: [{ y, x: 1 }],
          },
        },
      };
    }),
}));

export default useChartStore;
