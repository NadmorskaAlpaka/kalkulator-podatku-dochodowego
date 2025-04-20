// export const formatPLN = (value) => `${Number(value).toFixed(2)} zł`;
export const formatPLN = (value) => {
    const number = Number(value);
    if (Number.isInteger(number)) {
      return `${number} zł`;
    } else {
      return `${number.toFixed(2)} zł`;
    }
  };
  