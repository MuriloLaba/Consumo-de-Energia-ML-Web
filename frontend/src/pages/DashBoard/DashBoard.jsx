import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useDashBoard } from "./hooks/useDashBoard";

import Prediction from "./components/Prediction";
import Graphic from "./components/Graphic";

export function DashBoard() {
  const {
    selectedRegion,
    setSelectedRegion,
    handlePrediction,
    energyData,
    prediction,
    chartType,
    setChartType,
  } = useDashBoard();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-y-2">

      <div className="flex justify-between items-center bg-black w-full rounded-md p-2">
        
        <p className="text-white font-bold text-sm">Predição de Consumo de Energia</p>

        
        <div className="flex w-3/6 gap-x-2">

          <Select
            label="Tipo de Gráfico"
            value={chartType}
            onChange={(value) => setChartType(value)}
          >
            <Option value="line">Gráfico de Linha</Option>
            <Option value="bar">Gráfico de Barras</Option>
            <Option value="area">Gráfico de Área</Option>
          </Select>

          <Select 
            label="Selecione uma Região"
            value={selectedRegion}
            onChange={(value) => setSelectedRegion(value)}
          >
            <Option value="AEP">AEP - American Electric Power</Option>
            <Option value="COMED">COMED - Commonwealth Edison</Option>
            <Option value="DAYTON">DAYTON - Dayton Power & Light</Option>
            <Option value="DEOK">DEOK - Duke Energy Ohio/Kentucky</Option>
            <Option value="DOM">DOM - Dominion Virginia Power</Option>
            <Option value="DUQ">DUQ - Duquesne Light Company</Option>
            <Option value="EKPC">EKPC - East Kentucky Power Cooperative</Option>
            <Option value="FE">FE - FirstEnergy</Option>
            <Option value="NI">NI - Northern Indiana Public Service Company</Option>
            <Option value="PJM_Load">PJM Load - Total PJM Region Load</Option>
          </Select>

        </div>
      </div>

      <div className="w-full h-full flex gap-x-2">
        
        <div className="flex w-9/12 h-full border-2 border-black rounded-md">
          <Graphic
            energyData={energyData}
            chartType={chartType}
          />
        </div>

        <div className="flex w-3/12 h-full border-2 border-black rounded-md p-2">
          <Prediction
            handlePrediction={handlePrediction}
            prediction={prediction}
          />
        </div>

      </div>
    </div>
  );
}

export default DashBoard;
