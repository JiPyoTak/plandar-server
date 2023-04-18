const getBetweenDate = (date: Date) => {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;

  let nextMonth = month + 1;
  const additionYear = nextMonth > 12 ? 1 : 0;
  const nextFullYear = fullYear + additionYear;
  nextMonth = nextMonth > 12 ? nextMonth - 12 : nextMonth;

  const firstOfMonth = new Date(`${fullYear}-${month}-01, 00:00:00`);
  const firstOfNextMonth = new Date(
    `${nextFullYear}-${nextMonth}-01, 00:00:00`,
  );

  return [firstOfMonth, firstOfNextMonth];
};

export { getBetweenDate };
