export const getEnergyData = async (region) => {
  try {
    const response = await fetch(`http://localhost:5000/load-data/${region}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados de energia:", error);
    throw error;
  }
};

export const predictEnergy = async (region, predictionData) => {
  try {
    const response = await fetch(`http://localhost:5000/predict/${region}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(predictionData),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao fazer predição de energia:", error);
    throw error;
  }
};
