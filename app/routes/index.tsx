import { ChangeEvent, useState } from "react";
import { ClientOnly } from "remix-utils";

import Header from "../components/header/Header";
import LineChart from "../components/lineChart/LineChart.client";
import { LineChartDatum } from "../components/lineChart/types";

const LINE_CHART_NAME = "Hailstones";

export default function Index() {
  const [lineChartData, updateLineChartData] = useState<Array<LineChartDatum>>(
    []
  );

  const [inputValue, updateInputValue] = useState("");

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
    return !!!(isNaN(n) || n <= 1 || n > 100);
  };

  const onCalculateButtonClick = () => {
    let timer: NodeJS.Timeout;

    let currentValue = parseInt(inputValue);

    if (!isValidInput(currentValue)) return;

    updateLineChartData([{ x: 1, y: currentValue }]); // reset data with current input

    timer = setInterval(() => {
      if (currentValue <= 1) {
        clearTimeout(timer);
        return;
      }

      currentValue = hailStoneCalculation(currentValue);
      updateLineChartData((prevData) => {
        return [...prevData, { x: prevData.length + 1, y: currentValue }];
      });
    }, 750);
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
              className="bg-blue-500 mt-4 p-3 text-white text-lg uppercase rounded-full"
              type="button"
              onClick={onCalculateButtonClick}
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
                rel="nofollow"
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
            <LineChart
              data={[
                {
                  id: LINE_CHART_NAME,
                  data: lineChartData,
                },
              ]}
            />
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
