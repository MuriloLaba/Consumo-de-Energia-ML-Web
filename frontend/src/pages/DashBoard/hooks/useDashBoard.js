import { useState, useEffect } from "react";
import { getEnergyData, predictEnergy } from '../../../services/energyService';

export const useDashBoard = () => {
  const [selectedRegion, setSelectedRegion] = useState('AEP');
  const [energyData, setEnergyData] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [chartType, setChartType] = useState("line");

  console.log(energyData)

  useEffect(() => {
    if (selectedRegion) {
      fetchEnergyData(selectedRegion);
    }
  }, [selectedRegion]);

  const fetchEnergyData = async (region) => {
    try {
      const data = await getEnergyData(region);
      setEnergyData(data);
    } catch (error) {
      console.error("Erro ao buscar dados de energia:", error);
    }
  };

  const handlePrediction = async (predictionData) => {
    console.log("", predictionData);
    try {
      const predictEnergyResponse = await predictEnergy(selectedRegion, predictionData);
      setPrediction(predictEnergyResponse);
      console.log(predictEnergyResponse);
    } catch (error) {
      console.error("Erro ao fazer predição:", error);
    }
  };

  return {
    selectedRegion,
    setSelectedRegion,
    energyData,
    handlePrediction,
    prediction,
    chartType,
    setChartType,
  };
};
