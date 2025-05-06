import React from 'react';

const NumberToWords = ({ value }) => {
    // Helper function to convert a number into words
    const convertToWords = (num) => {
        if (num === 0) return 'Zero';

        const a = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen',
        ];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const toWordsBelow1000 = (n) => {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
            return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + toWordsBelow1000(n % 100) : '');
        };

        if (num < 1000) return toWordsBelow1000(num);
        if (num < 1_00_000) {
            const thousands = Math.floor(num / 1000);
            const remainder = num % 1000;
            return `${toWordsBelow1000(thousands)} Thousand${remainder ? ' ' + toWordsBelow1000(remainder) : ''}`;
        }
        if (num < 1_00_00_000) {
            const lakhs = Math.floor(num / 1_00_000);
            const remainder = num % 1_00_000;
            return `${toWordsBelow1000(lakhs)} Lakh${remainder ? ' ' + convertToWords(remainder) : ''}`;
        }
        const crores = Math.floor(num / 1_00_00_000);
        const remainder = num % 1_00_00_000;
        return `${toWordsBelow1000(crores)} Crore${remainder ? ' ' + convertToWords(remainder) : ''}`;
    };

    return (
        <p className='text-[12px] mt-1'>{convertToWords(Number(value))} Rupees</p>
    );
};

export default NumberToWords;
