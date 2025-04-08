import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CalculateTaxCompare = () => {

    const charsData = [
        {
            name: 'Skala podatkowa',
            tax: 4000,
            socialContributions: 2400,
            healthContributions: 2400,
        },
        {
            name: 'Podatek liniowy',
            tax: 3000,
            socialContributions: 1398,
            healthContributions: 2210,
        },
        {
            name: 'Ryczałt',
            tax: 2000,
            socialContributions: 9800,
            healthContributions: 2290,
        },
    ];

    return (
        <div className="tax-result__box">
            <ResponsiveContainer width="100%" height="100%" minHeight="400px">
                <BarChart
                    width={500}
                    height={300}
                    data={charsData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                        if (name === 'tax') return [value, 'Podatek dochodowy'];
                        if (name === 'socialContributions') return [value, 'Składki na ubezpieczenie społeczne'];
                        if (name === 'healthContributions') return [value, 'Składka zdrowotna'];
                        return [value, name];
                    }} />
                    <Legend formatter={(value) => {
                        if (value === 'tax') return 'Podatek dochodowy';
                        if (value === 'socialContributions') return 'Składki na ubezpieczenie społeczne';
                        if (value === 'healthContributions') return 'Składka zdrowotna';
                        return value;
                    }}
                    />
                    <Bar dataKey="tax" fill="#87A6B4" activeBar={<Rectangle fill="#87A6B4" stroke="#000000" />} />
                    <Bar dataKey="socialContributions" fill="#D9B88D" activeBar={<Rectangle fill="#D9B88D" stroke="#000000" />} />
                    <Bar dataKey="healthContributions" fill="#98b6b4" activeBar={<Rectangle fill="#98b6b4" stroke="#000000" />} />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%" minHeight="400px">
                <BarChart
                    width={500}
                    height={300}
                    data={charsData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                        if (name === 'tax') return [value, 'Podatek dochodowy'];
                        return [value, name];
                    }} />
                    <Legend formatter={(value) => {
                        if (value === 'tax') return 'Podatek dochodowy';
                        return value;
                    }}
                    />
                    <Bar dataKey="tax" fill="#87A6B4" activeBar={<Rectangle fill="#87A6B4" stroke="#000000" />} />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%" minHeight="400px">
                <BarChart
                    width={500}
                    height={300}
                    data={charsData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                        if (name === 'socialContributions') return [value, 'Składki na ubezpieczenie społeczne'];
                        return [value, name];
                    }} />
                    <Legend formatter={(value) => {
                        if (value === 'socialContributions') return 'Składki na ubezpieczenie społeczne';
                        return value;
                    }}
                    />
                    <Bar dataKey="socialContributions" fill="#D9B88D" activeBar={<Rectangle fill="#D9B88D" stroke="#000000" />} />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%" minHeight="400px">
                <BarChart
                    width={500}
                    height={300}
                    data={charsData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                        if (name === 'healthContributions') return [value, 'Składka zdrowotna'];
                        return [value, name];
                    }} />
                    <Legend formatter={(value) => {
                        if (value === 'healthContributions') return 'Składka zdrowotna';
                        return value;
                    }}
                    />
                    <Bar dataKey="healthContributions" fill="#98b6b4" activeBar={<Rectangle fill="#98b6b4" stroke="#000000" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CalculateTaxCompare;