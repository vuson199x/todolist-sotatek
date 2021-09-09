import { useState, useEffect } from "react";
import moment from "moment";

function AddEditForm(props) {
  let currentDate = new Date();
  const date = moment(currentDate).format("YYYY-MM-DD");
  console.log("date", date);
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    description: "",
    datetime: date,
    priority: 1,
  });

  const onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (props.taskEditing) {
      console.log(props.taskEditing);
      setFormValue({
        id: props.taskEditing.id,
        name: props.taskEditing.name,
        description: props.taskEditing.description,
        datetime: props.taskEditing.datetime,
        priority: props.taskEditing.priority,
      });
    }
  }, [props.taskEditing]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!formValue.name) {
      alert("Vui lòng nhập tên công việc");
    } else {
      console.log("formValue", formValue);
      props.getData(formValue);
      setFormValue({
        id: "",
        name: "",
        description: "",
        datetime: "",
        priority: 1,
      });
    }
  };

  const onCloseForm = () => {
    setFormValue({
      id: "",
      name: "",
      description: "",
      datetime: "",
      priority: 1,
    });
    props.onClose();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <input
          type="text"
          className="form-control"
          name="name"
          onChange={(e) => onChange(e)}
          value={formValue.name}
          placeholder="Add new Task"
        />
        {/* <p>Task name is required</p> */}
      </div>
      <div>
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          rows={12}
          cols="50"
          value={formValue.description}
          onChange={(e) => onChange(e)}
        ></textarea>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Due Date</label>
          <input
            className="form-control"
            type="date"
            id="datetime"
            name="datetime"
            value={formValue.datetime}
            min={date}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="col-6">
          <label>Priority</label>
          <select
            className="form-select"
            name="priority"
            onChange={(e) => onChange(e)}
            value={formValue.priority}
          >
            <option value="0">Low</option>
            <option value="1">Normal</option>
            <option value="2">High</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-success btn-form">
        {props.taskEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default AddEditForm;
