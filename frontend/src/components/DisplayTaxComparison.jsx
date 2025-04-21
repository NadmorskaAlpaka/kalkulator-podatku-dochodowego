import React from "react";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateTaxScale } from "../utils/calculateTaxScale";
import { calculateFlatTax } from "../utils/calculateFlatTax";
import { calculateLumpSumTax } from "../utils/calculateLumpSumTax";
import { calculateHealthContributionsForTaxScale } from "../utils/calculateHealthContributionsForTaxScale";
import { calculateHealtContributionForFlatTax } from "../utils/calculateHealtContributionForFlatTax";
import { calculateHealthContributionForLumpSumTax } from "../utils/calculateHealthContributionForLumpSumTax";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DisplayTaxComparison = ({data}) => {

    console.log("DisplayTaxComparison", data);

    const {taxData} = data;
    const {taxParameters} = data;
    const {income} = taxData
    const avgIncomeLastQuaterPrevYear = data.taxParameters.healthCountributions.avgIncomeLastQuaterPrevYear;
    const {socialContributions} = taxParameters;
    const {healthCountributions} = taxParameters;
    const healthCountributionsForLumpSumTax = healthCountributions.lumpSumTax;
    const netIncome = (taxData.income - taxData.costsOfIncome);

    // Składka społeczna
    const socialContributionsValue = calculateSocialContributions(socialContributions);

    // Składka zdrowotna
    const lumpSumTaxHealthContribution = calculateHealthContributionForLumpSumTax(income,healthCountributionsForLumpSumTax,avgIncomeLastQuaterPrevYear);
    const taxScaleHealthContribution = calculateHealthContributionsForTaxScale(netIncome,healthCountributions.taxScale.valuePercentage);
    const flatTaxHealthContribution = calculateHealtContributionForFlatTax(netIncome,healthCountributions);
    
    // Wyniki obliczeń podatku
    const taxScaleResult = calculateTaxScale(taxData,taxParameters,socialContributionsValue);
    const lumpSumTaxResult = calculateLumpSumTax(data,socialContributionsValue,lumpSumTaxHealthContribution);
    const flatTaxResult = calculateFlatTax(taxData,taxParameters,socialContributionsValue,flatTaxHealthContribution);
    
    const charsData = [
        {
            name: 'Skala podatkowa',
            tax: taxScaleResult.tax,
            socialContributions: socialContributionsValue.yearlySocialContributions,
            healthContributions: taxScaleHealthContribution,
        },
        {
            name: 'Podatek liniowy',
            tax: flatTaxResult.tax,
            socialContributions: socialContributionsValue.yearlySocialContributions,
            healthContributions: flatTaxHealthContribution,
        },
        {
            name: 'Ryczałt',
            tax: lumpSumTaxResult.tax,
            socialContributions: socialContributionsValue.yearlySocialContributions,
            healthContributions: lumpSumTaxHealthContribution.yearlyHealthContributionsValue,
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
                    <Bar dataKey="healthContributions" fill="#98b6b4" activeBar={<Rectangle fill="#98b6b4" stroke="#000000" />} />
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
        </div>
    )
}

export default DisplayTaxComparison;