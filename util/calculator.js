export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
  calculatorView: ""
};

export const handleNumber = (value, state) => {
  if (state.currentValue === "0") {
    return { currentValue: `${value}` };
  }

  return {
    calculatorView:`${state.currentValue}${value}`,
    currentValue: `${state.currentValue}${value}`,
  };
};

export const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null,
  };

  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...resetState,
    };
  }

  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState,
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState,
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState,
    };
  }

  return state;
};

export const handleDelete = (state) => {
  const { currentValue, previousValue, operator } = state;
  const current = parseFloat(currentValue);
  const arr = [];

  if (current > 0) {
    for (let i = 0; i < String(currentValue).length; i++) {
      arr.push(currentValue[i]);
    }
    const index = arr.lastIndexOf();
    arr.splice(index, 1);
    const intValue = parseInt(arr.join(""), 10); // Sử dụng cơ số 10 để đảm bảo số nguyên
    
    return { currentValue: `${intValue}` };
  }

};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
      
    case "operator":
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0",
        calculatorView:`${state.currentValue}${value}`
      };
    case "equal":
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case "delete":
      return handleDelete(state);
    default:
      return state;
  }
};

export default calculator;
