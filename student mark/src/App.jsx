import React, { useState } from "react";

const initialData = [
  { id: 1, name: "Om",     subject: "Maths",    marks: 88 },
  { id: 2, name: "Rahul",  subject: "Science",  marks: 72 },
  { id: 3, name: "Khushi",  subject: "English",  marks: 95 },
  { id: 4, name: "Aman",   subject: "Maths",    marks: 60 },
  { id: 5, name: "Sita",   subject: "Science",  marks: 81 },
];

export default function App() {
  const [data, setData] = useState(initialData);
  const [sortField, setSortField] = useState(null);
  const [order, setOrder] = useState("asc");
  const [filterSubject, setFilterSubject] = useState("");
  const [minMarks, setMinMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState("");

  // 🔹 Sorting Function
  const sortTable = (field) => {
    const newOrder = sortField === field && order === "asc" ? "desc" : "asc";
    setSortField(field);
    setOrder(newOrder);

    const sortedData = [...data].sort((a, b) => {
      if (newOrder === "asc") return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });

    setData(sortedData);
  };

  // 🔹 Filtering Logic
  const filteredData = data.filter((item) => {
    return (
      (filterSubject ? item.subject === filterSubject : true) &&
      (minMarks ? item.marks >= minMarks : true) &&
      (maxMarks ? item.marks <= maxMarks : true)
    );
  });

  return (
    <div className="container">
      <h2>Student Marks Table (Sorting + Filtering)</h2>

      {/* Filters */}
      <div>
        <select onChange={(e) => setFilterSubject(e.target.value)}>
          <option value="">Filter by Subject</option>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>

        <input
          type="number"
          placeholder="Min Marks"
          onChange={(e) => setMinMarks(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Marks"
          onChange={(e) => setMaxMarks(e.target.value)}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => sortTable("name")}>Name ↑↓</th>
            <th onClick={() => sortTable("subject")}>Subject ↑↓</th>
            <th onClick={() => sortTable("marks")}>Marks ↑↓</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.subject}</td>
              <td>{s.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
