import "./App.css";
import TableList from "./components/TableList";

function App() {
  return (
    <div className="task-section">
      <div className="text-center">
        <h3>SOTATEK</h3>
        <div>
          <p>Ứng viên: Vũ Hồng Sơn</p>
          <p>Ứng tuyển vị trí: Frontend Reactjs Developer</p>
        </div>
      </div>

      <TableList />
    </div>
  );
}

export default App;
