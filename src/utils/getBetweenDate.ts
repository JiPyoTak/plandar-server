const getBetweenDate = (date: Date) => {
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;

  let nextMonth = month + 1;
  const additionYear = nextMonth > 12 ? 1 : 0;
  const nextFullYear = fullYear + additionYear;
  nextMonth = nextMonth > 12 ? nextMonth - 12 : nextMonth;

  const firstOfMonth = new Date(
    `${fullYear}-${month.toString().padStart(2, '0')}-01T00:00:00.000Z`,
  );
  const lastOfMonth = new Date(
    new Date(
      `${nextFullYear}-${nextMonth
        .toString()
        .padStart(2, '0')}-01T00:00:00.000Z`,
    ).getTime() - 1,
  );

  return [firstOfMonth, lastOfMonth];
};

export { getBetweenDate };
