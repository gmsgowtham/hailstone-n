import { ChangeEvent, useState } from "react";
import { ClientOnly } from "remix-utils";
import { ResponsiveLine } from "@nivo/line";

import Header from "../components/header/Header";
import useChartStore from "~/store/chart";

const LINE_CHART_NAME = "Hailstones";

export default function Index() {
  const { inputValue, inProgress, chartData, updateInputValue, updateChartData, toggleProgress } = useChartStore(state => state);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const n = event.target.value || "";
    updateInputValue(n);
  };

  const hailStoneCalculation = (n: number) => {
    if (n % 2 === 0) {
      return n / 2;
    }
    return 3 * n + 1;
  };

  const isValidInput = (n: number): boolean => {
    return !(isNaN(n) || n <= 1 || n > 100);
  };

  const hasExistingChart = (chartID: string) => {
    return !!chartData[chartID]
  }

  const getChartId = (suffix: string) => {
    return `${LINE_CHART_NAME} - ${suffix}`;
  }

  const onCalculateButtonClick = () => {
    let currentValue = parseInt(inputValue);
    if (!isValidInput(currentValue)) return;

    const chartID = getChartId(inputValue);
    if (hasExistingChart(chartID)) return;
    if (Object.keys(chartData).length === 10) return;

    toggleProgress();
    updateChartData(chartID, currentValue);

    let timer: NodeJS.Timeout;
    timer = setInterval(() => {
      if (currentValue <= 1) {
        clearTimeout(timer);
        toggleProgress();
        return;
      }

      currentValue = hailStoneCalculation(currentValue);
      updateChartData(chartID, currentValue);
    }, 500);
  };

  return (
    <div className="relative h-screen bg-gray-100 overflow-auto">
      <Header sticky />
      <div className="flex flex-col h-full px-4 py-4 md:px-12 md:py-4">
        <div className="flex flex-col-reverse md:flex-row lg:flex-row items-start gap-8 bg-white p-4 border border-1 border-gray-300 rounded">
          <div className="flex flex-col w-full md:w-5/12 shrink-0">
            <label
              htmlFor="numberInput"
              className="mb-1 text-gray-700 text-base"
            >
              Enter a number between 1-100
            </label>
            <input
              id="numberInput"
              className="rounded h-12"
              name="numberInput"
              type={"number"}
              min={"0"}
              value={inputValue}
              onChange={onInputValueChange}
            />
            <span className="text-sm text-gray-500 mt-1">
              The number will be the starting point for calculating hailstone
              numbers
            </span>
            <button
              className="bg-blue-600 mt-4 p-3 text-white text-lg uppercase rounded-full disabled:opacity-30 disabled:pointer-events-none"
              type="button"
              onClick={onCalculateButtonClick}
              disabled={inProgress}
            >
              Draw steps
            </button>
          </div>
          <div className="text-gray-800 text-sm md:text-base">
            <blockquote className="px-4 py-2 bg-gradient-to-r from-cyan-300 to-blue-300 rounded">
              The conjecture is named after Lothar Collatz, who introduced the
              idea in 1937, two years after receiving his doctorate. It is also
              known as the 3n + 1 problem, the 3n + 1 conjecture, the Ulam
              conjecture (after Stanisław Ulam), Kakutani's problem (after
              Shizuo Kakutani), the Thwaites conjecture (after Sir Bryan
              Thwaites), Hasse's algorithm (after Helmut Hasse), or the Syracuse
              problem. The sequence of numbers involved is sometimes referred to
              as the hailstone sequence or hailstone numbers (because the values
              are usually subject to multiple descents and ascents like
              hailstones in a cloud), or as wondrous numbers.
              <a
                href="https://en.wikipedia.org/wiki/Collatz_conjecture"
                rel="nofollow noreferrer"
                target="_blank"
                className="block mt-2 underline text-blue-600"
              >
                Ref: Collatz conjecture
              </a>
            </blockquote>
          </div>
        </div>
        <div className="mt-4 flex-1 bg-white p-4 border border-1 border-gray-300 rounded">
          <ClientOnly>
            <ResponsiveLine
              data={Object.values(chartData)}
              margin={{ top: 48, right: 48, bottom: 48, left: 48 }}
              colors={{ scheme: "set1" }}
              xScale={{ type: "linear", min: "auto" }}
              yScale={{ type: "linear", min: "auto" }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Steps",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "top-left",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: -48,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 100,
                  itemHeight: 20,
                  itemOpacity: 1,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "transparent",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
