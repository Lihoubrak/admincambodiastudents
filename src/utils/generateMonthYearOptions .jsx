export const generateMonthYearOptions = () => {
  const options = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  for (let month = 1; month <= 12; month++) {
    // Creating a new date for each month
    const newDate = new Date(currentYear, month, 1);
    const formattedDate = newDate.toISOString().slice(0, 7); // Format: YYYY-MM

    options.push(
      <option key={formattedDate} value={formattedDate}>
        {formattedDate}
      </option>
    );
  }

  return options;
};
