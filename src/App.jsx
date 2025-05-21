import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("records");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    金額: "",
    カテゴリー: "",
    日付: "",
    メモ: "",
  });

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.金額 || !form.カテゴリー || !form.日付) return;
    setRecords([...records, { ...form }]);
    setForm({ 金額: "", カテゴリー: "", 日付: "", メモ: "" });
  };

  return (
    <div className="container">
      <h1 className="title">💰 パーソナル家計簿</h1>

      <form onSubmit={handleSubmit} className="form">
        {["金額", "カテゴリー", "日付", "メモ"].map((field, idx) => (
          <label key={idx} className="form-label">
            {field}：
            <input
              type={field === "金額" ? "number" : field === "日付" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== "メモ"}
              className="form-input"
              autoComplete="off"
            />
          </label>
        ))}

        <button type="submit" className="submit-btn">
          追加する
        </button>
      </form>

      <h2 className="subtitle">📋 登録された記録：</h2>

      <ul className="record-list">
        {records.length === 0 && <p className="empty-msg">まだ記録がありません。</p>}
        {records.map((r, idx) => (
          <li key={idx} className="record-item" style={{ animationDelay: `${idx * 0.1}s` }}>
            <span>{r.日付}</span>
            <span>{r.カテゴリー}</span>
            <span>¥{r.金額}</span>
            <span>{r.メモ || "—"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
