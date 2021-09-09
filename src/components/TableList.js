import { useEffect, useState } from "react";
import AddEditForm from "./AddEditForm";
import BulkAction from "./BulkAction";
import Controls from "./Controls";
import moment from "moment";
function random() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function TableList() {
  const [visible, setVisible] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [taskEditing, setTaskEditing] = useState(null);
  const [checkbox, setCheckBox] = useState([]);
  const dataList = JSON.parse(localStorage.getItem("tasks"));
  console.log("data", dataList);
  console.log("dataTable", dataTable);

  useEffect(() => {
    getDataTable();
  }, []);

  function getDataTable() {
    setDataTable(dataList);
  }

  const getData = (data) => {
    console.log(data, "data");
    let tasks = dataList?.length > 0 ? dataList : [];
    if (!data.id) {
      const obj = {
        ...data,
        id: random(),
      };
      tasks.unshift(obj);
    } else {
      const val = dataList.map((item) => {
        if (item.id === data.id) {
          return {
            id: data.id,
            name: data.name,
            description: data.description,
            datetime: data.datetime,
            priority: data.priority,
          };
        } else {
          return item;
        }
      });
      console.log("val", val);
      tasks = [...val];
    }
    tasks.sort((a, b) => {
      return new Date(a.datetime) - new Date(b.datetime);
    });
    setDataTable(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTaskEditing(null);
    setVisible(0);
  };

  const getDataUpdate = (data) => {
    console.log("data", data);
    setTaskEditing({
      ...data,
    });
    setVisible(data.id === visible ? 0 : data.id);
  };

  const onDeleteTask = (data) => {
    const tasks = dataList.filter((item) => item.id !== data.id);
    setDataTable(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  function onDeleteMulTask() {
    // var r = confirm("Press a button!");
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa ${checkbox.length} công việc`)
    ) {
      for (var i = dataList.length - 1; i >= 0; i--) {
        for (var j = 0; j < checkbox.length; j++) {
          if (dataList[i] && dataList[i].id === checkbox[j].id) {
            dataList.splice(i, 1);
          }
        }
      }
      setDataTable(dataList);
      setCheckBox([]);
      localStorage.setItem("tasks", JSON.stringify(dataList));
    }
  }

  const onChangeCheckbox = (data) => {
    const newArr = [...checkbox];
    const check = newArr.filter((item) => item.id === data.id);
    if (check.length > 0) {
      const data = newArr.filter((item) => item.id !== check[0].id);
      setCheckBox(data);
    } else {
      newArr.push(data);
      setCheckBox(newArr);
    }
  };

  const onSearch = (keyword) => {
    console.log(keyword);
    const tasks = dataList.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
    console.log("tasks", tasks);
    setDataTable(tasks);
  };

  console.log(checkbox, "checkbox");

  return (
    <>
      <div className="container">
        <div className="flex_box">
          <div className="flex_items">
            <div className="pd-25px">
              <div className="form-data">
                <h2 className="text-center">Add to task</h2>
                <AddEditForm getData={(data) => getData(data)} />
              </div>
            </div>
          </div>
          <div className="flex_items table">
            <div className="pd-25px mb-2rem">
              <h2 className="text-center" style={{ marginTop: "2rem" }}>
                To do List
              </h2>
              <Controls onSearch={(keyword) => onSearch(keyword)} />
              <div className="">
                {dataTable?.length > 0 ? (
                  dataTable.map((item, index) => {
                    return (
                      <div className="box">
                        <div
                          className="row item-task"
                          key={item.id}
                          style={{
                            borderBottom: `${
                              visible === item.id ? "1px solid #000" : "none"
                            }`,
                            // marginBottom: "2rem",
                          }}
                        >
                          <div className="mt-10">
                            <input
                              type="checkbox"
                              onClick={() => onChangeCheckbox(item)}
                            />
                          </div>
                          <div className="mt-10">{item.name}</div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => getDataUpdate(item)}
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => onDeleteTask(item)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        {visible === item.id && (
                          <div
                            className="form-data"
                            style={{ padding: "20px" }}
                          >
                            <AddEditForm
                              getData={(data) => getData(data)}
                              taskEditing={taskEditing}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <div className="text-center mt-21vh">Dữ liệu rỗng</div>
                  </div>
                )}
              </div>
            </div>
            <BulkAction
              onDeleteMulTask={() => onDeleteMulTask()}
              visible={checkbox}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableList;
