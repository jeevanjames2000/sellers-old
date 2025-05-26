const numberToWords = (num) => {
  num = Math.floor(num); // Ensure the number is an integer

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  if (num === 0) return "Zero";

  const convertLessThanThousand = (n) => {
    if (n === 0) return "";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    }
    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "")
    );
  };

  const convert = (n) => {
    if (n === 0) return "";
    if (n >= 10000000) {
      return (
        convertLessThanThousand(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 !== 0 ? " " + convert(n % 10000000) : "")
      );
    }
    if (n >= 100000) {
      return (
        convertLessThanThousand(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 !== 0 ? " " + convert(n % 100000) : "")
      );
    }
    if (n >= 1000) {
      return (
        convertLessThanThousand(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 !== 0 ? " " + convertLessThanThousand(n % 1000) : "")
      );
    }
    return convertLessThanThousand(n);
  };

  return convert(num).trim() + " Rupees Only";
};
export default numberToWords;
