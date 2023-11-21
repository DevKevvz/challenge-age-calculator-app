document.addEventListener('DOMContentLoaded', function () {
  let isValidDate = false;
  let calculateBtn = document.getElementsByClassName('btn')[0];

  //age displays
  let yearsOld = document.getElementById('year');
  let monthsOld = document.getElementById('month');
  let daysOld = document.getElementById('day');
  //inputs
  let dayInput = document.getElementById('day_input');
  let monthInput = document.getElementById('month_input');
  let yearInput = document.getElementById('year_input');
  //errors 
  let dayErrors = document.getElementById('day_error');
  let monthErrors = document.getElementById('month_error');
  let yearErrors = document.getElementById('year_error');
  let notRealDate = document.getElementById('no_real_date')
  const today = new Date()


  calculateBtn.addEventListener('click', calculateAge);
  
  function calculateAge() {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    validateInput(day, 1, 31, "Must be a valid day", "Must be a valid day", dayErrors, dayInput);
    validateInput(month, 1, 12, "Must be a valid month", "Must be a valid month", monthErrors, monthInput);
    validateInput(year, 1, today.getFullYear(), "Must be a valid year", "Must be in the past", yearErrors, yearInput);

    if (isValidDate){
      const today = new Date();
      const birthDateObj = new Date(`${Number(year)}-${Number(month)}-${Number(day)}`);
    
      let ageYears = today.getFullYear() - birthDateObj.getFullYear();
      let ageMonths = today.getMonth() - birthDateObj.getMonth();
      let ageDays = today.getDate() - birthDateObj.getDate();
    
      // Adjust ageMonths and ageYears if ageDays is negative
      if (ageDays < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDateObj.getDate());
        ageMonths = today.getMonth() - lastMonth.getMonth();
        ageDays = today.getDate() - lastMonth.getDate();
      }
    
      // Adjust ageYears if ageMonths is negative
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }

      if (checkDate(day, month, year)) {
          yearsOld.classList.remove("animate__fadeIn");
          yearsOld.innerHTML = ageYears;
          yearsOld.classList.add("animate__fadeIn");

          monthsOld.classList.remove("animate__fadeIn");
          monthsOld.innerHTML = ageMonths;
          monthsOld.classList.add("animate__fadeIn");

          daysOld.classList.remove("animate__fadeIn");
          daysOld.innerHTML = ageDays;
          daysOld.classList.add("animate__fadeIn");
      }else{
        notRealDate.innerHTML = "Date doesn't exist";
      }
    }
  }


  function validateInput(value, min, max, requiredMessage, invalidMessage, errorElement, input) {
    if (value === '' || !/^\d+$/.test(value)) {
      errorElement.innerHTML = "This field is required";
      input.style.borderColor = 'red';
      isValidDate = false;
    } else if (value < min || value > max) {
      errorElement.innerHTML = invalidMessage;
      input.style.borderColor = 'red';
      isValidDate = false;
    } else {
      errorElement.innerHTML = '';
      notRealDate.innerHTML = "";
      isValidDate = true;
      input.style.borderColor = '#dee2e6';
    }
  }

  function checkDate(day, month, year) {
    // Verificar si el año, mes y día son numéricos y están dentro de rangos válidos
  if (
    isNaN(year) || isNaN(month) || isNaN(day) ||
    year < 1 || month < 1 || month > 12 || day < 1
  ) {
    return false;
  }

  // Definir el número de días para cada mes
  const daysInMonth = [
    31, // Enero
    28, // Febrero (29 en un año bisiesto)
    31, // Marzo
    30, // Abril
    31, // Mayo
    30, // Junio
    31, // Julio
    31, // Agosto
    30, // Septiembre
    31, // Octubre
    30, // Noviembre
    31  // Diciembre
  ];

  // Verificar si el día proporcionado está dentro del rango para el mes
  return day <= daysInMonth[month - 1];
  }
});
