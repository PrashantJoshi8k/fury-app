import React, { useState, useEffect } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  Legend,
} from 'recharts';

// ===============================
// Local Storage Helper Functions
// ===============================

// Save data into localStorage
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Load data from localStorage
const loadFromStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

// ===============================
// Default Categories
// ===============================

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

// ===============================
// Chart Colors
// ===============================

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

  // ===============================
  // State Management
  // ===============================

  const [salary, setSalary] = useState(() =>
    loadFromStorage('salary', 0)
  );

  const [balance, setBalance] = useState(() =>
    loadFromStorage('balance', 0)
  );

  const [expenses, setExpenses] = useState(() =>
    loadFromStorage('expenses', [])
  );

  const [categoryList, setCategoryList] = useState(() =>
    loadFromStorage('categories', initialCategories)
  );

  const [isEditingSalary, setIsEditingSalary] =
    useState(false);

  const [salaryInput, setSalaryInput] = useState('');

  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    customName: '',
    note: '',
  });

  const [activePage, setActivePage] =
    useState('Expenses');

  // Used for Expense List Filter
  const [expenseFilter, setExpenseFilter] =
    useState('Today');

  // ===============================
  // NEW CHART FILTERS
  // ===============================

  const [chartFilter, setChartFilter] =
    useState('Month');

  // ===============================
  // CUSTOM DATE FILTERS
  // ===============================

  const [customStartDate, setCustomStartDate] =
    useState('');

  const [customEndDate, setCustomEndDate] =
    useState('');

  // ===============================
  // EDIT STATES
  // ===============================

  const [editingIndex, setEditingIndex] =
    useState(null);

  const [editAmount, setEditAmount] =
    useState('');

  const [editNote, setEditNote] =
    useState('');

  // ===============================
  // Save States into localStorage
  // ===============================

  useEffect(() => saveToStorage('salary', salary), [salary]);

  useEffect(() => saveToStorage('balance', balance), [balance]);

  useEffect(() => saveToStorage('expenses', expenses), [expenses]);

  useEffect(() => saveToStorage('categories', categoryList), [categoryList]);

  // ===============================
  // Salary Functions
  // ===============================

  const handleEditSalary = () => {
    setSalaryInput(salary === 0 ? '' : salary.toString());
    setIsEditingSalary(true);
  };

  const handleSalarySave = () => {

    const value = parseFloat(salaryInput) || 0;

    setSalary(value);

    // Reset Balance with New Salary
    setBalance(value);

    setIsEditingSalary(false);
  };

  // ===============================
  // Add Expense Function
  // ===============================

  const handleAddExpense = (customDate = new Date()) => {

    const expenseAmount = parseFloat(newExpense.amount);

    // If custom category selected use customName
    const category =
      newExpense.category === 'Custom'
        ? newExpense.customName.trim()
        : newExpense.category;

    // Validation
    if (!category || isNaN(expenseAmount) || expenseAmount <= 0)
      return;

    // Expense Object
    const expense = {
      category,
      amount: expenseAmount,
      note: newExpense.note || '',
      time: customDate,
    };

    // Add expense on top
    setExpenses([expense, ...expenses]);

    // Reduce balance
    setBalance(prev => prev - expenseAmount);

    // Reset form
    setNewExpense({
      category: '',
      amount: '',
      customName: '',
      note: '',
    });

    // Add custom category into category list
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

  // ===============================
  // DELETE EXPENSE
  // ===============================

  const handleDeleteExpense = (expenseToDelete) => {

    const updatedExpenses = expenses.filter(
      exp => exp !== expenseToDelete
    );

    setExpenses(updatedExpenses);

    setBalance(prev => prev + expenseToDelete.amount);
  };

  // ===============================
  // EDIT EXPENSE
  // ===============================

  const handleEditExpense = (expenseToEdit) => {

    const updatedExpenses = expenses.map(exp => {

      if (exp === expenseToEdit) {

        const oldAmount = exp.amount;

        const newAmount = parseFloat(editAmount);

        // Balance correction
        setBalance(prev =>
          prev + oldAmount - newAmount
        );

        return {
          ...exp,
          amount: newAmount,
          note: editNote,
        };
      }

      return exp;
    });

    setExpenses(updatedExpenses);

    setEditingIndex(null);

    setEditAmount('');

    setEditNote('');
  };

  // ===============================
  // Date Formatter
  // ===============================

  const formatDate = (date) => {

    return (
      date.toLocaleDateString('en-IN') +
      ' ' +
      date.toLocaleTimeString('en-IN')
    );
  };

  // ===============================
  // Expense Filter Logic
  // ===============================

  const filteredExpenses = expenses.filter(exp => {

    const now = new Date();

    const expDate = new Date(exp.time);

    const isToday =
      expDate.toDateString() === now.toDateString();

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const isYesterday =
      expDate.toDateString() ===
      yesterday.toDateString();

    const isFuture = expDate > new Date();

    // ===============================
    // CUSTOM DATE FILTER
    // ===============================

    const customStart = customStartDate
      ? new Date(customStartDate)
      : null;

    const customEnd = customEndDate
      ? new Date(customEndDate)
      : null;

    if (customEnd) {
      customEnd.setHours(23, 59, 59, 999);
    }

    const isWithinCustomRange =
      customStart &&
      customEnd &&
      expDate >= customStart &&
      expDate <= customEnd;

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
  });

  // ===============================
  // Chart Filter Logic
  // ===============================

  const chartExpenses = expenses.filter(exp => {

    const expDate = new Date(exp.time);

    const currentDate = new Date();

    const isToday =
      expDate.toDateString() === currentDate.toDateString();

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const isYesterday =
      expDate.toDateString() === yesterday.toDateString();

    const isCurrentMonth =
      expDate.getMonth() === currentDate.getMonth() &&
      expDate.getFullYear() === currentDate.getFullYear();

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

  // ===============================
  // Prepare Chart Data
  // Group Expenses by Category
  // ===============================

  const chartDataMap = {};

  chartExpenses.forEach((expense) => {

    if (chartDataMap[expense.category]) {

      chartDataMap[expense.category] += expense.amount;

    } else {

      chartDataMap[expense.category] = expense.amount;
    }
  });

  // Convert Object into Array for PieChart

  const chartData = Object.keys(chartDataMap).map(
    (category, index) => ({
      id: index + 1,
      name: category,
      value: chartDataMap[category],
    })
  );

  // ===============================
  // TOTALS
  // ===============================

  const expenseTotal = filteredExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const chartTotal = chartExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (

    <div
      className="container py-4"
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
      }}
    >

      {/* =============================== */}
      {/* Header */}
      {/* =============================== */}

      <div
        className="d-flex justify-content-between align-items-center flex-wrap p-3 mb-4"
        style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}
      >

        <h2
          style={{
            fontWeight: '700',
            color: '#222',
          }}
        >
          SpendTrackr
        </h2>

        <p className="m-0">
          <strong>Date:</strong>{' '}
          {new Date().toLocaleDateString('en-IN')}
        </p>

      </div>

      {/* =============================== */}
      {/* Salary Section */}
      {/* =============================== */}

      <div
        className="p-4 mb-4"
        style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}
      >

        {isEditingSalary ? (

          <>

            <input
              type="number"
              value={salaryInput}
              onChange={(e) =>
                setSalaryInput(e.target.value)
              }
              className="form-control w-50 mb-3"
              placeholder="Enter Monthly Salary"
            />

            <button
              onClick={handleSalarySave}
              className="btn btn-primary"
            >
              Save Salary
            </button>

          </>

        ) : (

          <div className="d-flex justify-content-between align-items-center flex-wrap">

            <div>

              <h5 className="mb-1">
                Available Balance
              </h5>

              <h2
                style={{
                  color: '#16a34a',
                  fontWeight: '700',
                }}
              >
                ₹{balance.toLocaleString('en-IN')}
              </h2>

            </div>

            <button
              onClick={handleEditSalary}
              className="btn btn-outline-dark"
            >
              Edit Salary
            </button>

          </div>

        )}

      </div>

      {/* =============================== */}
      {/* Navigation */}
      {/* =============================== */}

      <div className="mb-4 text-center">

        <button
          onClick={() => setActivePage('Expenses')}
          className={`btn mx-2 ${
            activePage === 'Expenses'
              ? 'btn-danger'
              : 'btn-outline-danger'
          }`}
        >
          Expenses
        </button>

        <button
          onClick={() => setActivePage('Savings')}
          className={`btn mx-2 ${
            activePage === 'Savings'
              ? 'btn-success'
              : 'btn-outline-success'
          }`}
        >
          Savings
        </button>

        <button
          onClick={() => setActivePage('Charts')}
          className={`btn mx-2 ${
            activePage === 'Charts'
              ? 'btn-dark'
              : 'btn-outline-dark'
          }`}
        >
          Charts
        </button>

      </div>

      {/* =============================== */}
      {/* Expenses Page */}
      {/* =============================== */}

      {activePage === 'Expenses' && (

        <div
          className="p-4"
          style={{
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          }}
        >

          {/* Filters */}

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
                onClick={() => setExpenseFilter(type)}
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

          {/* =============================== */}
          {/* CUSTOM DATE PICKER */}
          {/* =============================== */}

          {expenseFilter === 'Custom' && (

            <div className="row mb-4">

              <div className="col-md-4 mb-2">

                <input
                  type="date"
                  className="form-control"
                  value={customStartDate}
                  onChange={(e) =>
                    setCustomStartDate(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4 mb-2">

                <input
                  type="date"
                  className="form-control"
                  value={customEndDate}
                  onChange={(e) =>
                    setCustomEndDate(e.target.value)
                  }
                />

              </div>

            </div>

          )}

          {/* =============================== */}
          {/* Add Expense Form */}
          {/* =============================== */}

          {(expenseFilter === 'Today' ||
            expenseFilter === 'Yesterday') && (

            <div className="mb-4">

              <div className="row">

                {/* Category */}

                <div className="col-md-3 mb-2">

                  <select
                    value={newExpense.category}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        category: e.target.value,
                      })
                    }
                    className="form-select"
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categoryList.map((cat, idx) => (

                      <option key={idx} value={cat}>
                        {cat}
                      </option>

                    ))}

                  </select>

                </div>

                {/* Custom Category */}

                {newExpense.category === 'Custom' && (

                  <div className="col-md-3 mb-2">

                    <input
                      type="text"
                      placeholder="Custom category"
                      value={newExpense.customName}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          customName: e.target.value,
                        })
                      }
                      className="form-control"
                    />

                  </div>

                )}

                {/* Amount */}

                <div className="col-md-2 mb-2">

                  <input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        amount: e.target.value,
                      })
                    }
                    className="form-control"
                  />

                </div>

                {/* Note */}

                <div className="col-md-3 mb-2">

                  <input
                    type="text"
                    placeholder="Optional note"
                    value={newExpense.note}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        note: e.target.value,
                      })
                    }
                    className="form-control"
                  />

                </div>

                {/* Add Button */}

                <div className="col-md-1 mb-2">

                  <button
                    onClick={() => {

                      if (
                        expenseFilter === 'Yesterday'
                      ) {

                        const yesterday =
                          new Date();

                        yesterday.setDate(
                          yesterday.getDate() - 1
                        );

                        handleAddExpense(yesterday);

                      } else {

                        handleAddExpense();
                      }
                    }}
                    className="btn btn-danger w-100"
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

          )}

          {/* =============================== */}
          {/* Expense List */}
          {/* =============================== */}

          {filteredExpenses.length > 0 ? (

            <ul className="list-group">

              {filteredExpenses.map((exp, idx) => (

                <li
                  key={idx}
                  className="list-group-item p-3 mb-2 border-0"
                  style={{
                    borderRadius: '14px',
                    background: '#f8fafc',
                  }}
                >

                  <div className="d-flex justify-content-between align-items-start flex-wrap">

                    <div>

                      <h6 className="mb-1">
                        {exp.category}
                      </h6>

                      <small className="text-muted">
                        {formatDate(
                          new Date(exp.time)
                        )}
                      </small>

                      {exp.note && (

                        <div
                          className="mt-2 px-2 py-1"
                          style={{
                            background: '#e0f2fe',
                            borderRadius: '8px',
                            width: 'fit-content',
                            fontSize: '13px',
                          }}
                        >
                          {exp.note}
                        </div>

                      )}

                    </div>

                    {/* =============================== */}
                    {/* EDIT MODE */}
                    {/* =============================== */}

                    {editingIndex === idx ? (

                      <div className="d-flex flex-column align-items-end">

                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) =>
                            setEditAmount(
                              e.target.value
                            )
                          }
                          className="form-control mb-2"
                          style={{ width: '140px' }}
                        />

                        <input
                          type="text"
                          value={editNote}
                          onChange={(e) =>
                            setEditNote(
                              e.target.value
                            )
                          }
                          placeholder="Edit note"
                          className="form-control mb-2"
                          style={{ width: '140px' }}
                        />

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            handleEditExpense(exp)
                          }
                        >
                          Save
                        </button>

                      </div>

                    ) : (

                      <div className="text-end">

                        <h5
                          style={{
                            color: '#dc2626',
                            fontWeight: '700',
                          }}
                        >
                          ₹{exp.amount.toLocaleString('en-IN')}
                        </h5>

                        <div className="mt-2">

                          <button
                            className="btn btn-warning btn-sm mx-1"
                            onClick={() => {

                              setEditingIndex(idx);

                              setEditAmount(
                                exp.amount
                              );

                              setEditNote(
                                exp.note || ''
                              );
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() =>
                              handleDeleteExpense(exp)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                </li>

              ))}

            </ul>

          ) : (

            <div className="text-center py-5">

              <h5 className="text-muted">
                No Records Found
              </h5>

            </div>

          )}

          {/* =============================== */}
          {/* TOTAL */}
          {/* =============================== */}

          <div className="text-end mt-4">

            <h4>
              Total Expenses :
              <span
                style={{
                  color: '#dc2626',
                  fontWeight: '700',
                }}
                className="mx-2"
              >
                ₹{expenseTotal.toLocaleString('en-IN')}
              </span>
            </h4>

          </div>

        </div>

      )}

      {/* =============================== */}
      {/* Savings Page */}
      {/* =============================== */}

      {activePage === 'Savings' && (

        <div
          className="p-5 text-center"
          style={{
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          }}
        >

          <h3 className="text-success">
            Savings Feature Coming Soon...
          </h3>

        </div>

      )}

      {/* =============================== */}
      {/* Charts Page */}
      {/* =============================== */}

      {activePage === 'Charts' && (

        <div
          className="p-4"
          style={{
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          }}
        >

          <h3 className="mb-4">
            Expense Analytics Dashboard
          </h3>

          {/* Chart Filters */}

          <div className="mb-4">

            {[
              'Today',
              'Yesterday',
              'Month',
              'All',
            ].map(type => (

              <button
                key={type}
                onClick={() => setChartFilter(type)}
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

          {/* Summary */}

          {chartData.length > 0 ? (

            <ul className="list-group mb-4">

              {chartData.map((item, idx) => (

                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >

                  <strong>
                    #{item.id} - {item.name}
                  </strong>

                  <span
                    style={{
                      color: COLORS[idx],
                      fontWeight: '700',
                    }}
                  >
                    ₹{item.value.toLocaleString('en-IN')}
                  </span>

                </li>

              ))}

            </ul>

          ) : (

            <p className="text-muted">
              No Chart Records
            </p>

          )}

          {/* Total */}

          <div className="text-end mb-4">

            <h4>
              Total :
              <span
                className="mx-2"
                style={{
                  color: '#2563eb',
                  fontWeight: '700',
                }}
              >
                ₹{chartTotal.toLocaleString('en-IN')}
              </span>
            </h4>

          </div>

          {/* Pie Chart */}

          <div className="d-flex justify-content-center">

            <PieChart width={700} height={420}>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >

                {chartData.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </div>

          {/* =============================== */}
          {/* OLD CHART CODE - COMMENTED */}
          {/* =============================== */}

          {/*
          <PieChart width={600} height={300}>
            <Pie data={filteredExpenses} dataKey='amount' label>
              {filteredExpenses.map((entry, index)=>(
                <Cell
                  key={`cell-${index}`}
                  fill={`COLORS${[index]}`}
                ></Cell>
              ))}
            </Pie>
            <Tooltip></Tooltip>
          </PieChart>
          */}

        </div>

      )}

    </div>
  );
}