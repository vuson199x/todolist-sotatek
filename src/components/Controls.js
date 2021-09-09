import { useState } from "react";

function Controls(props) {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="row">
      <input
        type="text"
        className="form-control"
        style={{ width: "100%" }}
        placeholder="Nhập tên công việc..."
        onChange={(e) => {
          props.onSearch(e.target.value);
          setKeyword(e.target.value);
        }}
      />
    </div>
  );
}

export default Controls;
