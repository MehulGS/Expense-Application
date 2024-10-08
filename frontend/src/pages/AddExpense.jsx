import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense, bulkAddExpenses } from "../api/api"; // Make sure you have this function

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    paymentMethod: "cash", // Default payment method
    date: "",
  });
  const [csvFile, setCsvFile] = useState(null); // State to store CSV file
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]); // Store the uploaded CSV file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (csvFile) {
      // If CSV file is provided, handle bulk upload
      const formData = new FormData();
      formData.append("file", csvFile);

      try {
        await bulkAddExpenses(formData); // Bulk upload via CSV
        navigate("/"); // Redirect to the MyExpenses page after successful addition
      } catch (error) {
        console.error("Error uploading CSV file:", error);
        setError("Failed to upload CSV. Please try again.");
      }
    } else {
      // Handle single expense entry
      if (!formData.amount || !formData.description || !formData.date) {
        setError("Please fill all the required fields");
        return;
      }

      try {
        await addExpense(formData);
        navigate("/"); // Redirect to the MyExpenses page after successful addition
      } catch (error) {
        console.error("Error adding expense:", error);
        setError("Failed to add expense. Please try again.");
      }
    }
  };

  return (
    <div className="bg-cyan-100 p-6">
    <div className="container mx-auto p-6 max-w-lg shadow-lg rounded-lg bg-sky-950">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Add Expense
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="text-red-500 mb-4 p-2 rounded bg-red-100">{error}</p>
        )}

        <div>
          <label className="block text-blue-600 text-sm font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-blue-600 text-sm font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label className="block text-blue-600 text-sm font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block text-blue-600 text-sm font-semibold mb-2">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="cash" className="bg-transparent text-black">Cash</option>
            <option value="credit" className="bg-transparent text-black">Credit</option>
          </select>
        </div>

        <div>
          <label className="block text-blue-600 text-sm font-semibold mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-3 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-600 text-sm font-semibold mb-2">
            Upload CSV for Bulk Expenses
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-3 border bg-transparent border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md w-full hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {csvFile ? "Upload CSV" : "Add Expense"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddExpense;
