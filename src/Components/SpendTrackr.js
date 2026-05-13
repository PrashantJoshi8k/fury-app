
import React, { useState, useEffect, useMemo } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialCategories = [
  'Travel',
  'Food',
  'Groceries',
  'Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Shopping',
  'Rent',
  'Subscriptions',
  'Custom',
];

const COLORS = [
  '#0088FE',
  '#FF8042',
  '#00C49F',
  '#FFBB28',
  '#AF19FF',
  '#FF4560',
  '#775DD0',
  '#3F51B5',
  '#4CAF50',
  '#F44336',
];

export default function SpendTrackr() {
  const [salary, setSalary] = useState(() =>
    loadFromStorage('salary', 0)
  );

  const [expenses, setExpenses] = useState(() =>
    loadFromStorage('expenses', [])
  );

  const [categoryList, setCategoryList] = useState(() =>
    loadFromStorage('categories', initialCategories)
  );

  const [budgetLimit, setBudgetLimit] = useState(() =>
    loadFromStorage('budgetLimit', 0)
  );

  const [darkMode, setDarkMode] = useState(false);

  const [activePage, setActivePage] =
    useState('Expenses');

  const [expenseFilter, setExpenseFilter] =
    useState('Today');

  const [chartFilter, setChartFilter] =
    useState('Month');

  const [customStartDate, setCustomStartDate] =
    useState('');

  const [customEndDate, setCustomEndDate] =
    useState('');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [isEditingSalary, setIsEditingSalary] =
    useState(false);

  const [salaryInput, setSalaryInput] =
    useState('');

  const [budgetInput, setBudgetInput] =
    useState('');

  const [editingId, setEditingId] =
    useState(null);

  const [editAmount, setEditAmount] =
    useState('');

  const [editNote, setEditNote] =
    useState('');

  const [newExpense, setNewExpense] =
    useState({
      category: '',
      amount: '',
      customName: '',
      note: '',
    });

  useEffect(() => {
    saveToStorage('salary', salary);
  }, [salary]);

  useEffect(() => {
    saveToStorage('expenses', expenses);
  }, [expenses]);

  useEffect(() => {
    saveToStorage('categories', categoryList);
  }, [categoryList]);

  useEffect(() => {
    saveToStorage('budgetLimit', budgetLimit);
  }, [budgetLimit]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (acc, item) => acc + item.amount,
      0
    );
  }, [expenses]);

  const balance = useMemo(() => {
    return salary - totalExpenses;
  }, [salary, totalExpenses]);

  const savingsPercentage = useMemo(() => {
    return salary > 0
      ? ((balance / salary) * 100).toFixed(1)
      : 0;
  }, [salary, balance]);

  const formatDate = (date) => {
    const d = new Date(date);

    return (
      d.toLocaleDateString('en-IN') +
      ' ' +
      d.toLocaleTimeString('en-IN')
    );
  };

  const handleSalarySave = () => {
    const value = parseFloat(salaryInput);

    if (isNaN(value) || value < 0) return;

    setSalary(value);

    setIsEditingSalary(false);
  };

  const handleBudgetSave = () => {
    const value = parseFloat(budgetInput);

    if (isNaN(value) || value < 0) return;

    setBudgetLimit(value);
  };

  const handleAddExpense = (
    customDate = new Date()
  ) => {
    const expenseAmount = parseFloat(
      newExpense.amount
    );

    const category =
      newExpense.category === 'Custom'
        ? newExpense.customName.trim()
        : newExpense.category;

    if (
      !category ||
      isNaN(expenseAmount) ||
      expenseAmount <= 0
    ) {
      return;
    }

    const expense = {
      id: Date.now(),
      category,
      amount: expenseAmount,
      note: newExpense.note || '',
      time: customDate.toISOString(),
    };

    setExpenses(prev => [expense, ...prev]);

    setNewExpense({
      category: '',
      amount: '',
      customName: '',
      note: '',
    });

    if (
      newExpense.category === 'Custom' &&
      category &&
      !categoryList.includes(category)
    ) {
      setCategoryList(prev => [
        ...prev.filter(c => c !== 'Custom'),
        category,
        'Custom',
      ]);
    }
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter(
      exp => exp.id !== id
    );

    setExpenses(updatedExpenses);
  };

  const handleEditExpense = (id) => {
    const newAmount = parseFloat(editAmount);

    if (
      isNaN(newAmount) ||
      newAmount <= 0
    ) {
      return;
    }

    const updatedExpenses = expenses.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          amount: newAmount,
          note: editNote,
        };
      }

      return exp;
    });

    setExpenses(updatedExpenses);

    setEditingId(null);

    setEditAmount('');

    setEditNote('');
  };

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter(exp => {
        const now = new Date();

        const expDate = new Date(exp.time);

        const isToday =
          expDate.toDateString() ===
          now.toDateString();

        const yesterday = new Date();

        yesterday.setDate(
          yesterday.getDate() - 1
        );

        const isYesterday =
          expDate.toDateString() ===
          yesterday.toDateString();

        const isFuture =
          expDate > new Date();

        const customStart = customStartDate
          ? new Date(customStartDate)
          : null;

        const customEnd = customEndDate
          ? new Date(customEndDate)
          : null;

        if (customEnd) {
          customEnd.setHours(
            23,
            59,
            59,
            999
          );
        }

        const isWithinCustomRange =
          (!customStart ||
            expDate >= customStart) &&
          (!customEnd ||
            expDate <= customEnd);

        switch (expenseFilter) {
          case 'Today':
            return isToday;

          case 'Yesterday':
            return isYesterday;

          case 'Future':
            return isFuture;

          case 'Custom':
            return isWithinCustomRange;

          default:
            return true;
        }
      })
      .filter(exp =>
        exp.category
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )
      );
  }, [
    expenses,
    expenseFilter,
    customStartDate,
    customEndDate,
    searchQuery,
  ]);

  const chartExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const expDate = new Date(exp.time);

      const currentDate = new Date();

      const isToday =
        expDate.toDateString() ===
        currentDate.toDateString();

      const yesterday = new Date();

      yesterday.setDate(
        yesterday.getDate() - 1
      );

      const isYesterday =
        expDate.toDateString() ===
        yesterday.toDateString();

      const isCurrentMonth =
        expDate.getMonth() ===
          currentDate.getMonth() &&
        expDate.getFullYear() ===
          currentDate.getFullYear();

      switch (chartFilter) {
        case 'Today':
          return isToday;

        case 'Yesterday':
          return isYesterday;

        case 'Month':
          return isCurrentMonth;

        case 'All':
          return true;

        default:
          return true;
      }
    });
  }, [expenses, chartFilter]);

  const chartData = useMemo(() => {
    const chartDataMap = {};

    chartExpenses.forEach(expense => {
      if (chartDataMap[expense.category]) {
        chartDataMap[expense.category] +=
          expense.amount;
      } else {
        chartDataMap[expense.category] =
          expense.amount;
      }
    });

    return Object.keys(chartDataMap).map(
      (category, index) => ({
        id: index + 1,
        name: category,
        value: chartDataMap[category],
      })
    );
  }, [chartExpenses]);

  const chartTotal = useMemo(() => {
    return chartExpenses.reduce(
      (acc, item) => acc + item.amount,
      0
    );
  }, [chartExpenses]);

  const theme = darkMode
    ? {
        background: '#0f172a',
        card: '#1e293b',
        text: '#ffffff',
      }
    : {
        background: '#f5f7fb',
        card: '#ffffff',
        text: '#111827',
      };

  return (
    <div
      className="container py-4"
      style={{
        minHeight: '100vh',
        background: theme.background,
        color: theme.text,
      }}
    >
      <h1 className="mb-4">
        SpendTrackr
      </h1>

      {/* SALARY SECTION */}

<div
  className="p-4 mb-4"
  style={{
    background: theme.card,
    borderRadius: '18px',
    boxShadow:
      '0 4px 15px rgba(0,0,0,0.08)',
  }}
>
  {isEditingSalary ? (
    <>
      <input
        type="number"
        value={salaryInput}
        onChange={e =>
          setSalaryInput(
            e.target.value
          )
        }
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSalarySave();
          }
        }}
        className="form-control mb-3"
        placeholder="Enter Salary"
      />

      <button
        className="btn btn-primary"
        onClick={handleSalarySave}
      >
        Save Salary
      </button>
    </>
  ) : (
    <div className="row">
      <div className="col-md-3">
        <h6>Salary</h6>

        <h3 className="text-primary">
          ₹
          {salary.toLocaleString(
            'en-IN'
          )}
        </h3>
      </div>

      <div className="col-md-3">
        <h6>Balance</h6>

        <h3 className="text-success">
          ₹
          {balance.toLocaleString(
            'en-IN'
          )}
        </h3>
      </div>

      <div className="col-md-3">
        <h6>Savings Rate</h6>

        <h3 className="text-warning">
          {savingsPercentage}%
        </h3>
      </div>

      <div className="col-md-3 d-flex align-items-center">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setSalaryInput(
              salary.toString()
            );

            setIsEditingSalary(
              true
            );
          }}
        >
          Edit Salary
        </button>
      </div>
    </div>
  )}
</div>

{/* BUDGET SECTION */}

<div
  className="p-4 mb-4"
  style={{
    background: theme.card,
    borderRadius: '18px',
  }}
>
  <div className="row">
    <div className="col-md-4 mb-2">
      <input
        type="number"
        className="form-control"
        placeholder="Monthly Budget"
        value={budgetInput}
        onChange={e =>
          setBudgetInput(
            e.target.value
          )
        }
      />
    </div>

    <div className="col-md-2 mb-2">
      <button
        className="btn btn-dark w-100"
        onClick={handleBudgetSave}
      >
        Save Budget
      </button>
    </div>

    <div className="col-md-6">
      <h5>
        Budget Limit: ₹
        {budgetLimit.toLocaleString(
          'en-IN'
        )}
      </h5>

      {totalExpenses >
        budgetLimit &&
        budgetLimit > 0 && (
          <div className="alert alert-danger mt-2">
            Budget Limit Exceeded!
          </div>
        )}
    </div>
  </div>
</div>

{/* NAVIGATION */}

<div className="mb-4 text-center">
  {[
    'Expenses',
    'Charts',
    'Savings',
  ].map(page => (
    <button
      key={page}
      onClick={() =>
        setActivePage(page)
      }
      className={`btn mx-2 ${
        activePage === page
          ? 'btn-dark'
          : 'btn-outline-dark'
      }`}
    >
      {page}
    </button>
  ))}
</div>

{/* EXPENSE PAGE */}

{activePage === 'Expenses' && (
  <div
    className="p-4"
    style={{
      background: theme.card,
      borderRadius: '18px',
    }}
  >
    {/* FILTERS */}

    <div className="mb-4">
      {[
        'All',
        'Yesterday',
        'Today',
        'Future',
        'Custom',
      ].map(type => (
        <button
          key={type}
          onClick={() =>
            setExpenseFilter(type)
          }
          className={`btn mx-1 mb-2 ${
            expenseFilter === type
              ? 'btn-dark'
              : 'btn-outline-dark'
          }`}
        >
          {type}
        </button>
      ))}
    </div>

    {/* SEARCH */}

    <div className="mb-4">
      <input
        type="text"
        placeholder="Search category..."
        className="form-control"
        value={searchQuery}
        onChange={e =>
          setSearchQuery(
            e.target.value
          )
        }
      />
    </div>

    {/* CUSTOM FILTER */}

    {expenseFilter === 'Custom' && (
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="date"
            className="form-control"
            value={customStartDate}
            onChange={e =>
              setCustomStartDate(
                e.target.value
              )
            }
          />
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="date"
            className="form-control"
            value={customEndDate}
            onChange={e =>
              setCustomEndDate(
                e.target.value
              )
            }
          />
        </div>
      </div>
    )}

    {/* ADD FORM */}

    <div className="row mb-4">
      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={newExpense.category}
          onChange={e =>
            setNewExpense({
              ...newExpense,
              category:
                e.target.value,
            })
          }
        >
          <option value="">
            Select Category
          </option>

          {categoryList.map(
            (cat, idx) => (
              <option
                key={idx}
                value={cat}
              >
                {cat}
              </option>
            )
          )}
        </select>
      </div>

      {newExpense.category ===
        'Custom' && (
        <div className="col-md-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Custom category"
            value={
              newExpense.customName
            }
            onChange={e =>
              setNewExpense({
                ...newExpense,
                customName:
                  e.target.value,
              })
            }
          />
        </div>
      )}

      <div className="col-md-2 mb-2">
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={e =>
            setNewExpense({
              ...newExpense,
              amount:
                e.target.value,
            })
          }
        />
      </div>

      <div className="col-md-3 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Optional note"
          value={newExpense.note}
          onChange={e =>
            setNewExpense({
              ...newExpense,
              note: e.target.value,
            })
          }
        />
      </div>

      <div className="col-md-2 mb-2">
        <button
          className="btn btn-danger w-100"
          onClick={() =>
            handleAddExpense()
          }
        >
          Add
        </button>
      </div>
    </div>

    {/* EXPENSE LIST */}

    {filteredExpenses.length >
    0 ? (
      <ul className="list-group">
        {filteredExpenses.map(
          exp => (
            <li
              key={exp.id}
              className="list-group-item p-3 mb-2 border-0"
              style={{
                borderRadius:
                  '14px',
                background:
                  darkMode
                    ? '#334155'
                    : '#f8fafc',
              }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap">
                <div>
                  <h6>
                    {exp.category}
                  </h6>

                  <small>
                    {formatDate(
                      exp.time
                    )}
                  </small>

                  {exp.note && (
                    <div
                      className="mt-2 px-2 py-1"
                      style={{
                        background:
                          '#dbeafe',
                        borderRadius:
                          '8px',
                        width:
                          'fit-content',
                      }}
                    >
                      {exp.note}
                    </div>
                  )}
                </div>

                {editingId ===
                exp.id ? (
                  <div className="d-flex flex-column">
                    <input
                      type="number"
                      className="form-control mb-2"
                      value={
                        editAmount
                      }
                      onChange={e =>
                        setEditAmount(
                          e.target
                            .value
                        )
                      }
                    />

                    <input
                      type="text"
                      className="form-control mb-2"
                      value={
                        editNote
                      }
                      onChange={e =>
                        setEditNote(
                          e.target
                            .value
                        )
                      }
                    />

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        handleEditExpense(
                          exp.id
                        )
                      }
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="text-end">
                    <h5 className="text-danger">
                      ₹
                      {exp.amount.toLocaleString(
                        'en-IN'
                      )}
                    </h5>

                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => {
                        setEditingId(
                          exp.id
                        );

                        setEditAmount(
                          exp.amount
                        );

                        setEditNote(
                          exp.note ||
                            ''
                        );
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() =>
                        handleDeleteExpense(
                          exp.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        )}
      </ul>
    ) : (
      <div className="text-center py-5">
        <h5>No Records Found</h5>
      </div>
    )}
    {/* TOTAL EXPENSES */}

<div className="text-end mt-4">
  <h4>
    Total Expenses :
    <span
      className="mx-2 text-danger"
      style={{
        fontWeight: '700',
      }}
    >
      ₹
      {filteredExpenses
        .reduce(
          (acc, item) =>
            acc + item.amount,
          0
        )
        .toLocaleString('en-IN')}
    </span>
  </h4>
</div>
  </div>
)}


{/* CHART PAGE */}

{activePage === 'Charts' && (
  <div
    className="p-4"
    style={{
      background: theme.card,
      borderRadius: '18px',
    }}
  >
    <h3 className="mb-4">
      Expense Analytics Dashboard
    </h3>

    <div className="mb-4">
      {[
        'Today',
        'Yesterday',
        'Month',
        'All',
      ].map(type => (
        <button
          key={type}
          onClick={() =>
            setChartFilter(type)
          }
          className={`btn mx-1 mb-2 ${
            chartFilter === type
              ? 'btn-dark'
              : 'btn-outline-dark'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
      {/* CHART TOTAL */}

<div className="text-end mb-4">
  <h4>
    Total :
    <span
      className="mx-2 text-primary"
      style={{
        fontWeight: '700',
      }}
    >
      ₹
      {chartTotal.toLocaleString(
        'en-IN'
      )}
    </span>
  </h4>
</div>
    <div
      style={{
        width: '100%',
        height: '420px',
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            label={({
              name,
              percent,
            }) =>
              `${name} ${(
                percent *
                100
              ).toFixed(0)}%`
            }
          >
            {chartData.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
)}

{/* SAVINGS PAGE */}

{activePage === 'Savings' && (
  <div
    className="p-5 text-center"
    style={{
      background: theme.card,
      borderRadius: '18px',
    }}
  >
    <h3 className="text-success">
      Savings Overview
    </h3>

    <hr />

    <h5 className="mb-3">
      Monthly Salary :
      <span className="mx-2 text-primary">
        ₹
        {salary.toLocaleString(
          'en-IN'
        )}
      </span>
    </h5>

    <h5 className="mb-3">
      Total Expenses :
      <span className="mx-2 text-danger">
        ₹
        {totalExpenses.toLocaleString(
          'en-IN'
        )}
      </span>
    </h5>

    <h5 className="mb-3">
      Current Savings :
      <span className="mx-2 text-success">
        ₹
        {balance.toLocaleString(
          'en-IN'
        )}
      </span>
    </h5>

    <h5>
      Savings Rate :
      <span className="mx-2 text-warning">
        {savingsPercentage}%
      </span>
    </h5>
  </div>
)}
    </div>
  );
}



