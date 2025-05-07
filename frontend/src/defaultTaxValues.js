export const defaultValues = {
    flatTax: 19,
    taxScale: {
        firstPercentage: 12,
        incomeThreshold: 120000,
        secondPercentage: 32,
        employeeMonthlyCostsOfIncome: 250,
        monthlyTaxReductionAmount: 300
    },
    lumpSumTax:[2,3,5.5,8.5,10,12,12.5,14,15,17],
    socialContributions: {
        minSocialContributionBasis: 5203.80,
        uEmerytalnePercentage: 19.52,
        uRentowePercentage: 8,
        uChorobowePercentage: 2.45,
        uWypadkowePercentage: 1.67,
        funduszPracyPercentage: 2.45,
    },
    employeeSocialContributions: {
        uEmerytalnePercentage: 9.76,
        uRentowePercentage: 1.50,
        uChorobowePercentage: 2.45
    },
    healthCountributions: {
        mimIncome: 4666,
        avgIncomeLastQuaterPrevYear: 8549.18,
        flatTax: {
            valuePercentage: 4.9,
            minHealthCountributions: 314.96
        },
        taxScale: {
            valuePercentage: 9,
            minHealthCountributions: 314.96,
            employeeValuePercentage: 9,
        },
        lumpSumTax: {
            small: {
                maxIncome: 60000,
                basisPercentage: 60,
                valuePercentage: 9,
            },
            medium: {
                maxIncome: 300000,
                basisPercentage: 100,
                valuePercentage: 9,
            },
            big: {
                basisPercentage: 180,
                valuePercentage: 9,
            }
        },
    },
    taxBreaks: {
        internetMaxValue: 760,
        children: {
            one: {
                value: 1112.04,
                limit: 56000,
                spousLimit: 112000
            },
            two: 2224.08,
            three: 4224.12,
            four: 6924.12,
            moreThanFour: 2700,
        },
        bloodDonation: {
            maxIncomPercentage: 6,
            value: 130
        },
        newTechnologyPercentage: 50,
        youth: 85528
    },
    danina: {
        valuePercentage: 4,
        minIncome: 1000000
    },
    taxFreeAmout: 30000
}