export type LinePointData = number | string | Date;

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

export type ChartState = {
  inProgress: boolean;
  inputValue: string;
  chartData: LineChartStateData;
  hasError: boolean;
  errorMessage: string;
  toggleProgress: Function;
  updateInputValue: Function;
  updateChartData: Function;
  setErrorMessage: Function;
};
