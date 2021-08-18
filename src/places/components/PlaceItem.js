// called from PlaceList.js
// SUMMARY: Returns the location <img> and place title, address, and location
//          Creates a <li> with the <Card> framing, along with 3 <Button>'s
//          also contains a Modal to show the gps map of the requested location
import React, { useState, useContext } from 'react';

// use <Card/> to wrap my <div> containers below with my <Card /> component
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceItem.css'; // this will style our <Modal

const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // set to false because we initially don't show this Modal

  /* Map function handlers */
  function openMapHandler() {
    setShowMap(true);
  }

  function closeMapHandler() {
    setShowMap(false);
  }
  
  /* Modal function handlers for deletion */
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };


  // we have Modal Fragment first, before the <li> of Place <Card>'s, so that <Modal /> can pop-out and show location for this user
  // in <Modal>, we have {props.children} within the contentClass <div>
  return (
    <React.Fragment>
      <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}/>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it 
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (<Button to={`/places/${props.id}`}>EDIT</Button>)}
            {auth.isLoggedIn && (<Button danger onClick={showDeleteWarningHandler}>DELETE</Button>)}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;