const typeSelect = document.getElementById('type');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const result = document.getElementById('result');

const units = {
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  length: ['Meters', 'Kilometers', 'Miles', 'Feet'],
  weight: ['Grams', 'Kilograms', 'Pounds', 'Ounces']
};

function populateUnits(type) {
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  units[type].forEach(unit => {
    const opt1 = document.createElement('option');
    opt1.value = unit;
    opt1.textContent = unit;
    const opt2 = opt1.cloneNode(true);
    fromUnit.appendChild(opt1);
    toUnit.appendChild(opt2);
  });
}

function convert() {
  const type = typeSelect.value;
  const value = parseFloat(inputValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  if (isNaN(value)) {
    result.textContent = 'Result: ';
    return;
  }

  let converted;

  if (type === 'temperature') {
    if (from === to) converted = value;
    else if (from === 'Celsius') {
      if (to === 'Fahrenheit') converted = value * 9/5 + 32;
      else if (to === 'Kelvin') converted = value + 273.15;
    } else if (from === 'Fahrenheit') {
      if (to === 'Celsius') converted = (value - 32) * 5/9;
      else if (to === 'Kelvin') converted = (value - 32) * 5/9 + 273.15;
    } else if (from === 'Kelvin') {
      if (to === 'Celsius') converted = value - 273.15;
      else if (to === 'Fahrenheit') converted = (value - 273.15) * 9/5 + 32;
    }
  }

  else if (type === 'length') {
    const lengthRates = {
      'Meters': 1,
      'Kilometers': 1000,
      'Miles': 1609.34,
      'Feet': 0.3048
    };
    converted = value * lengthRates[from] / lengthRates[to];
  }

  else if (type === 'weight') {
    const weightRates = {
      'Grams': 1,
      'Kilograms': 1000,
      'Pounds': 453.592,
      'Ounces': 28.3495
    };
    converted = value * weightRates[from] / weightRates[to];
  }

  result.textContent = `Result: ${converted.toFixed(3)} ${to}`;
}

typeSelect.addEventListener('change', () => {
  populateUnits(typeSelect.value);
  convert();
});

[inputValue, fromUnit, toUnit].forEach(el => {
  el.addEventListener('input', convert);
});

populateUnits(typeSelect.value);
