import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modall from 'react-bootstrap/Modal';
import "./Modal.css";

function Modal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="button" onClick={handleShow}>
            +
      </div>
      <div className="buttonhover"></div>
      <Modall show={show} onHide={handleClose} size="xl">
        <Modall.Header className="head">
          <Modall.Title className="headtext">New Post</Modall.Title>
        </Modall.Header>
        <Modall.Body>
                <div className="profile"></div>
                <textarea className="text" placeholder="Write..."></textarea>
        </Modall.Body>
        <Modall.Footer className="foot">
          <div className="close" onClick={handleClose}>
            Close
          </div>
          <div className="post" onClick={handleClose}>
            Save Changes
          </div>
        </Modall.Footer>
      </Modall>
    </>
  );
}

export default Modal;


