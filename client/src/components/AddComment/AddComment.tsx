import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modall from 'react-bootstrap/Modal';
import "../AddComment/AddComment.css";

function AddComment() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="Cbutton" onClick={handleShow}>
            Add Comment
      </div>
      <div className="Cbuttonhover"></div>
      <Modall show={show} onHide={handleClose} size="xl">
        <Modall.Header className="Chead">
          <Modall.Title className="Cheadtext">New Post</Modall.Title>
        </Modall.Header>
        <Modall.Body>
                <div className="Cprofile"></div>
                <textarea className="Ctext" placeholder="Write..."></textarea>
        </Modall.Body>
        <Modall.Footer className="Cfoot">
          <div className="Cclose" onClick={handleClose}>
            Close
          </div>
          <div className="Cpost" onClick={handleClose}>
            Save Changes
          </div>
        </Modall.Footer>
      </Modall>
    </>
  );
}

export default AddComment;


