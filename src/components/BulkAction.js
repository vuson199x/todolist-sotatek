function BulkAction(props) {
  console.log(props, "props");
  return (
    <>
      {props.visible.length > 0 && (
        <div className="footer">
          <div className="container">
            <div className="row">
              <p>Bulk Action</p>
              <div>
                <button
                  type="button"
                  className="btn btn-success"
                  // onClick={() => getDataUpdate(item)}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => props.onDeleteMulTask()}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default BulkAction;
