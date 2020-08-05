const current_year = new Date().getFullYear();
const years = [current_year - 1, current_year, current_year + 1];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const periods = [];

years.forEach((year) => {
  months.forEach((month) => {
    const period = `${year}-${month.toString().padStart(2, '0')}`;
    periods.push(period);
  });
});

export { periods };
