import React, { useEffect, useState } from 'react';
import {
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function Graphic({ energyData, chartType }) {
    const [dataKey, setDataKey] = useState('');

    useEffect(() => {
        if (energyData.length > 0) {
            const keys = Object.keys(energyData[0]);
            const consumptionKey = keys.find(key => key.includes('_MW'));
            setDataKey(consumptionKey);
        }
    }, [energyData]);

    // Formata a data para exibir dia, mês, ano e hora
    const formattedData = energyData.map(item => ({
        ...item,
        Datetime: new Date(item.Datetime).toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }));

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Datetime" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Datetime" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={dataKey} fill="#82ca9d" />
                    </BarChart>
                );
            case 'area':
                return (
                    <AreaChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Datetime" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col flex-grow w-full">
            <ResponsiveContainer width="100%">
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
}

export default Graphic;
