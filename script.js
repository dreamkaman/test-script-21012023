function calculateTeamFinanceReport(salaries, team) {
  let result = { totalBudgetTeam: 0 };
  const salariesWithTotal = { ...salaries };

  for (const key in salariesWithTotal) {
    if (Object.hasOwnProperty.call(salariesWithTotal, key)) {
      salariesWithTotal[key] = { ...salaries[key], total: 0 };
    }
  }

  team.forEach((worker) => {
    if (salariesWithTotal[worker.specialization]) {
      const { salary, tax, total } = salariesWithTotal[worker.specialization];
      const taxValue = parseInt(tax);

      salariesWithTotal[worker.specialization].total =
        total + salary / (1 - taxValue / 100);
    }
  });

  for (const key in salariesWithTotal) {
    if (Object.hasOwnProperty.call(salariesWithTotal, key)) {
      const budgetKey = `totalBudget${key}`;

      const totalBudgetTeam =
        result.totalBudgetTeam + salariesWithTotal[key].total;

      result = {
        ...result,
        [budgetKey]: Math.trunc(salariesWithTotal[key].total),
        totalBudgetTeam,
      };
    }
  }

  result.totalBudgetTeam = Math.trunc(result.totalBudgetTeam);

  return result;
}
