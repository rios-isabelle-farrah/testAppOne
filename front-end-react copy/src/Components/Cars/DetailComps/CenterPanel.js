import { Link } from "react-router-dom";
import "./CenterPanel.css";
import filer from "../../Images/file.png"

const CenterPanel = ({ car, id, handleDelete }) => {
  return (
    <div className="concar-div">
      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Warning!!!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              You are about to delete this car. All records associated with this car will be lost.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Keep Car</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} data-dismiss="modal">Delete Car</button>
            </div>
          </div>
        </div>
      </div>
      <img className="concar" src={filer}/>
        
      <div className="all-bs">
        <button type="button" class=" button-delete" data-toggle="modal" data-target="#exampleModalCenter"></button>
        <Link to={`/cars/${id}/edit`}>
          <button className="button-edit"></button>
        </Link>
      </div>
    </div>
  );
};

export default CenterPanel;
