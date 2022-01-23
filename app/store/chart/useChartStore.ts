import create from "zustand";

import { ChartState, LinePointData } from "./types";

const useChartStore = create<ChartState>((set) => ({
  inProgress: false,
  inputValue: "",
  chartData: {},
  errorMessage: "",
  hasError: false,
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
  setErrorMessage: (errorMessage: string) =>
    set((state) => ({ ...state, errorMessage, hasError: true })),
  clearErrorMessage: () =>
    set((state) => ({ ...state, hasError: false, errorMessage: "" })),
}));

export default useChartStore;
