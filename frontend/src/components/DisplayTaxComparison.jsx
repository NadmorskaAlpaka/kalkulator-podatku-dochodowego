import React from "react";
import "../styles/displayTaxComparison.css";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateSmallSocialContributions } from "../utils/calculateSmallSocialContributions";
import { calculateStartSocialContributions } from "../utils/calculateStartSocialContributions";
import { calculateStartAndSmallSocialContributions } from "../utils/calculateStartAndSmallSocialContributions";
import { calculateTaxScale } from "../utils/calculateTaxScale";
import { calculateFlatTax } from "../utils/calculateFlatTax";
import { calculateLumpSumTax } from "../utils/calculateLumpSumTax";
import { calculateHealthContributionForTaxScale } from "../utils/calculateHealthContributionForTaxScale";
import { calculateHealthContributionForFlatTax } from "../utils/calculateHealthContributionForFlatTax";
import { calculateHealthContributionForLumpSumTax } from "../utils/calculateHealthContributionForLumpSumTax";
import { formatPLN } from "../utils/formatPLN";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DisplayTaxComparison = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {income} = taxData
    const avgIncomeLastQuaterPrevYear = data.taxParameters.healthContributions.avgIncomeLastQuaterPrevYear;
    const {socialContributions} = taxParameters;
    const {healthContributions} = taxParameters;
    const healthCountributionsForLumpSumTax = healthContributions.lumpSumTax;
    const netIncome = (taxData.income - taxData.costsOfIncome);

    // Składka społeczna
    let socialContributionsValue = 0 
    
    if(taxData.zus == "maly_zus"){
        socialContributionsValue = calculateSmallSocialContributions(socialContributions);
    } else if(taxData.zus == "zus_na_start") {
        socialContributionsValue = calculateStartSocialContributions(socialContributions);
    } else if(taxData.zus == "start_i_maly_zus") {
            socialContributionsValue = calculateStartAndSmallSocialContributions(socialContributions);
    } else {
        socialContributionsValue = calculateSocialContributions(socialContributions);
    }

    // Składka zdrowotna
    const lumpSumTaxHealthContribution = calculateHealthContributionForLumpSumTax(income,healthCountributionsForLumpSumTax,avgIncomeLastQuaterPrevYear);
    const taxScaleHealthContribution = calculateHealthContributionForTaxScale(netIncome,healthContributions.taxScale.valuePercentage,taxParameters);
    const flatTaxHealthContribution = calculateHealthContributionForFlatTax(netIncome,healthContributions);
    
    // Wyniki obliczeń podatku
    const taxScaleResult = calculateTaxScale(taxData,taxParameters,socialContributionsValue);
    const lumpSumTaxResult = calculateLumpSumTax(data,socialContributionsValue,lumpSumTaxHealthContribution);
    const flatTaxResult = calculateFlatTax(taxData,taxParameters,socialContributionsValue,flatTaxHealthContribution);
    
    const charsData = [
        {
            name: 'Skala podatkowa',
            tax: parseFloat(taxScaleResult.tax.toFixed(2)),
            socialContributions: parseFloat(socialContributionsValue.yearlySocialContributions.toFixed(2)),
            healthContributions: parseFloat(taxScaleHealthContribution.toFixed(2)),
        },
        {
            name: 'Podatek liniowy',
            tax: parseFloat(flatTaxResult.tax.toFixed(2)),
            socialContributions: parseFloat(socialContributionsValue.yearlySocialContributions.toFixed(2)),
            healthContributions: parseFloat(flatTaxHealthContribution.toFixed(2)),
        },
        {
            name: 'Ryczałt',
            tax: parseFloat(lumpSumTaxResult.tax.toFixed(2)),
            socialContributions: parseFloat(socialContributionsValue.yearlySocialContributions.toFixed(2)),
            healthContributions: parseFloat(lumpSumTaxHealthContribution.yearlyHealthContributionsValue.toFixed(2)),
        },
    ];

    return (
        <div className="tax-result__box">
            <div className="tax-info">
                <div className="tax__box">
                    <h2 className="tax__name">Roczny przychód:</h2>
                    <p className="tax__value">{formatPLN(taxData.income)}</p>
                </div>
                <div className="tax__box">
                    <h2 className="tax__name">Roczne koszty uzyskania przychodu:</h2>
                    <p className="tax__value">{formatPLN(taxData.costsOfIncome)}</p>
                </div>
                <div className="tax__box">
                    <h2 className="tax__name">Wybrana stawka ryczałtu:</h2>
                    <p className="tax__value">{taxData.selectedLumpSumValue}%</p>
                </div>
            </div>
            <h2 className="chart__header">Porównanie ogólne</h2>
            <ResponsiveContainer className="chart">
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
                    <YAxis domain={[0, (dataMax) => Math.ceil(dataMax / 10) * 10]}/>
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
                    <Bar dataKey="healthContributions" fill="#98b6b4" activeBar={<Rectangle fill="#98b6b4" stroke="#000000" />} />
                    <Bar dataKey="socialContributions" fill="#D9B88D" activeBar={<Rectangle fill="#D9B88D" stroke="#000000" />} />
                </BarChart>
            </ResponsiveContainer>
            
            <h2 className="chart__header">Porównanie podatku dochodowego</h2>
            <ResponsiveContainer className="chart">
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
                    <YAxis domain={[0, (dataMax) => Math.ceil(dataMax / 10) * 10]} />
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
            
            <h2 className="chart__header">Porównanie składki zdrowotnej</h2>
            <ResponsiveContainer className="chart">
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
                    <YAxis domain={[0, (dataMax) => Math.ceil(dataMax / 10) * 10]} />
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
            
            <h2 className="chart__header">Porównanie składek na ubezpieczenie społeczne</h2>
            <ResponsiveContainer className="chart">
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
                    <YAxis domain={[0, (dataMax) => Math.ceil(dataMax / 10) * 10]} />
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
        </div>
    )
}

export default DisplayTaxComparison;