import React, { useState, useEffect } from 'react';

// Helper functions for localStorage
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
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

export default function SpendTrackr() {
  // All hooks must be here inside the component
  const [salary, setSalary] = useState(() => loadFromStorage('salary', 0));
  const [balance, setBalance] = useState(() => loadFromStorage('balance', 0));
  const [expenses, setExpenses] = useState(() => loadFromStorage('expenses', []));
  const [categoryList, setCategoryList] = useState(() => loadFromStorage('categories', initialCategories));

  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [salaryInput, setSalaryInput] = useState('');
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', customName: '' });
  const [activePage, setActivePage] = useState('Expenses');
  const [expenseFilter, setExpenseFilter] = useState('Today');

  // Save to localStorage
  useEffect(() => saveToStorage('salary', salary), [salary]);
  useEffect(() => saveToStorage('balance', balance), [balance]);
  useEffect(() => saveToStorage('expenses', expenses), [expenses]);
  useEffect(() => saveToStorage('categories', categoryList), [categoryList]);

  const handleEditSalary = () => {
    setSalaryInput(salary === 0 ? '' : salary.toString());
    setIsEditingSalary(true);
  };

  const handleSalarySave = () => {
    const value = parseFloat(salaryInput) || 0;
    setSalary(value);
    setBalance(value);
    setIsEditingSalary(false);
  };

  const handleAddExpense = () => {
    const expenseAmount = parseFloat(newExpense.amount);
    const category =
      newExpense.category === 'Custom'
        ? newExpense.customName.trim()
        : newExpense.category;

    if (!category || isNaN(expenseAmount) || expenseAmount <= 0) return;

    const expense = {
      category,
      amount: expenseAmount,
      time: new Date(),
    };

    setExpenses([expense, ...expenses]);
    setBalance(prev => prev - expenseAmount);
    setNewExpense({ category: '', amount: '', customName: '' });

    // Optionally add custom category
    if (newExpense.category === 'Custom' && category && !categoryList.includes(category)) {
      setCategoryList(prev => [...prev.filter(c => c !== 'Custom'), category, 'Custom']);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN');
  };

  const filteredExpenses = expenses.filter(exp => {
    const now = new Date();
    const expDate = new Date(exp.time);
    const isToday = expDate.toDateString() === new Date().toDateString();
    const isYesterday = expDate.toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString();
    const isFuture = expDate > new Date();

    switch (expenseFilter) {
      case 'Today': return isToday;
      case 'Yesterday': return isYesterday;
      case 'Future': return isFuture;
      default: return true;
    }
  });

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>SpendTrackr</h2>
        <p><strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}</p>
      </div>
      <hr />

      {/* Salary Section */}
      <div className="mb-3">
        {isEditingSalary ? (
          <>
            <input
              type="number"
              value={salaryInput}
              onChange={(e) => setSalaryInput(e.target.value)}
              className="form-control w-50 mb-2"
              placeholder="Enter Monthly Salary"
            />
            <button onClick={handleSalarySave} className="btn btn-primary btn-sm">Save</button>
          </>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              Available Balance:
              <span style={{ color: '#07ff07ff' }} className="mx-2">₹{balance.toLocaleString('en-IN')}/-</span>
            </h5>
            <button onClick={handleEditSalary} className="btn btn-outline-secondary btn-sm">Edit Salary</button>
          </div>
        )}
      </div>

      {/* Page Toggle */}
      <div className="mb-3">
        <button onClick={() => setActivePage('Expenses')} className={`btn me-2 ${activePage === 'Expenses' ? 'btn-primary' : 'btn-outline-primary'} mx-1`}>Expenses</button>
        <button onClick={() => setActivePage('Savings')} className={`btn ${activePage === 'Savings' ? 'btn-success' : 'btn-outline-success'} mx-1`}>Savings</button>
      </div>

      {/* Expenses Page */}
      {activePage === 'Expenses' && (
        <div>
          <div className="btn-group mb-3">
            {['All', 'Yesterday', 'Today', 'Future'].map(type => (
              <button
                key={type}
                onClick={() => setExpenseFilter(type)}
                className={`btn ${expenseFilter === type ? 'btn-dark' : 'btn-outline-dark'} mx-1`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Add Expense */}
          {expenseFilter === 'Today' && (
            <div className="mb-4">
              <div className="row align-items-center">
                <div className="col-md-4 mb-2">
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    {categoryList.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {newExpense.category === 'Custom' && (
                  <div className="col-md-4 mb-2">
                    <input
                      type="text"
                      placeholder="Enter custom category"
                      value={newExpense.customName}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, customName: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                )}

                <div className="col-md-3 mb-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="col-md-1 mb-2">
                  <button onClick={handleAddExpense} className="btn btn-danger w-100">+</button>
                </div>
              </div>
            </div>
          )}

          {/* Expense List */}
          {filteredExpenses.length > 0 ? (
            <ul className="list-group">
              {filteredExpenses.map((exp, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{exp.category}</strong><br />
                    <small>{formatDate(new Date(exp.time))}</small>
                  </div>
                  <span className="text-danger fw-bold">- ₹{exp.amount.toLocaleString('en-IN')}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No Records.</p>
          )}
        </div>
      )}

      {/* Savings Page */}
      {activePage === 'Savings' && (
        <div>
          <p className="text-muted">Savings feature coming soon.</p>
        </div>
      )}
    </div>
  );
}