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
    <div className="h-screen bg-gray-100 overflow-auto">
      <Header />
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex items-start gap-8 bg-white p-4 border border-1 border-gray-300 rounded">
          <div className="flex flex-col w-5/12 shrink-0">
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
          <div className="text-gray-800 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
