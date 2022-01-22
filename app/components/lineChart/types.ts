export type LineChartDatum = {
  x: number | string | Date;
  y: number | string | Date;
}

export type LineChartData = Array<{
  id: string | number;
  color?: string;
  data: Array<LineChartDatum>;
}>;

export type LineChartProps = {
  data: LineChartData;
};
