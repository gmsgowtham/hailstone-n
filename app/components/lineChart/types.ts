export type LineChartDatum = {
  x: number | string | Date;
  y: number | string | Date;
}

export type LineChartData = Array<{
  id: string | number;
  data: Array<LineChartDatum>;
}>;

export type LineChartProps = {
  data: LineChartData;
};