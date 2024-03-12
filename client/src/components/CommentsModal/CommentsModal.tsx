import Modall from 'react-bootstrap/Modal';
import "./CommentsModal.css";
import Comments from "../Comments/Comments";
import AddC from "../AddComment/AddComment";


interface CommentsModalProps {
    show: boolean;
    handleClose: () => void;
  }
  
  const CommentsModal: React.FC<CommentsModalProps> = ({ show, handleClose }) => {
    let Comment = [];

    for(let i = 0; i < 12; i++){
        Comment.push( <Comments key={i}/>)
    }

  return (
    <>
      <Modall show={show} onHide={handleClose} size="xl">
        <Modall.Header className="head">
        </Modall.Header>
        <Modall.Body>
                <div className="container">
                <div className="left-div">
                    <div className="profile-pic"></div>
                    <div className="username">Erik Karlsson</div>
                </div>
                <div className="right-div">
                <div className="text"> 
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, eum
                    non. Saepe, iure voluptatibus consequatur, quos ex laboriosam fugiat
                    deserunt similique itaque esse ipsam dolores nisi expedita tempora
                    architecto quia?
                </div>
                </div>
            </div>
              {Comment}
            <div className="space"></div>
        </Modall.Body>
        <Modall.Footer className="foots">
          <div className="close" onClick={handleClose}>
            Close
          </div>
          <div>
            <AddC/>
          </div>
        </Modall.Footer>
      </Modall>
    </>
  );
}

export default CommentsModal;


