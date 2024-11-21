import React, { useState } from 'react';
import { Button, Input, Select, Option } from '@material-tailwind/react';

function Prediction({ handlePrediction, prediction }) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');

  const calculateWeekdayAndWeekend = () => {
    // Cria uma data fictícia com os inputs fornecidos
    const date = new Date(2024, parseInt(month) - 1, parseInt(day)); // Ano arbitrário
    const weekday = date.getDay(); // 0 = Domingo, 6 = Sábado
    const isWeekend = weekday === 0 || weekday === 6 ? 1 : 0; // 1 para fim de semana, 0 para dia útil
    return { weekday, isWeekend };
  };

  const handleButtonClick = () => {
    const { weekday, isWeekend } = calculateWeekdayAndWeekend();

    const predictionData = {
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      weekday: parseInt(weekday),
      isWeekend: parseInt(isWeekend),
    };
    handlePrediction(predictionData);
  };

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <p className='text-center text-sm font-bold text-green-600'>
        Faça uma predição de consumo de energia de uma região
      </p>

      <Select
        label="Mês"
        value={month}
        onChange={(value) => setMonth(value)}
      >
        <Option value="1">Janeiro</Option>
        <Option value="2">Fevereiro</Option>
        <Option value="3">Março</Option>
        <Option value="4">Abril</Option>
        <Option value="5">Maio</Option>
        <Option value="6">Junho</Option>
        <Option value="7">Julho</Option>
        <Option value="8">Agosto</Option>
        <Option value="9">Setembro</Option>
        <Option value="10">Outubro</Option>
        <Option value="11">Novembro</Option>
        <Option value="12">Dezembro</Option>
      </Select>

      <Input
        label='Dia'
        value={day}
        type='number'
        onChange={(e) => setDay(e.target.value)}
      />

      <Input
        label='Hora'
        value={hour}
        type='number'
        onChange={(e) => setHour(e.target.value)}
      />

      <Button 
        size='sm'
        color='green'
        onClick={handleButtonClick}
      >
        Fazer Predição
      </Button>

      <div className='flex-col flex-grow content-center text-center gap-y-2'>
        <p className='text-black text-sm '>
          A predição para o consumo de energia na data: {day}/{month} às {hour}h
        </p>

        <p className='text-green-800 text-sm font-bold mt-10'>
          {prediction.predicted_consumption}
        </p>
      </div>
    </div>
  );
}

export default Prediction;
