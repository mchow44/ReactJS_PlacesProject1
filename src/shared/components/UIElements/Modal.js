// <Modal/> called within PlaceItem.js, and inside that file, it's under the <Button>VIEW ON MAP</Button>
// the <Modal /> call will have style design for each <div> container: ${props.headerClass} ${props.contentClass} ${props.footerClass} = <Modal headerClass="" contentClasss="" ..etc.>
// Similar logic written to MainNavigation.js, we have <Modal> function's return statement below, where if props.show is true, then activate <BackDrop> and <ModalOverlay {...props} />
// We want <CSSTransition> animation to wrap around <ModalOverlay /> box
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

// this <ModalOverlay /> component is not exported, but will be called at this file and shown on the screen
// props will be passed from this Modal.js program, because we will be using <ModalOverlay /> inside here
// we have {props.style} in case we want to add our own custom in-line styles to the <div> of our ModalOverlay
// {props.headerClass}, {props.contentClass} and {props.footer} for any customization class CSS styling
// <form>:
//   - the ternary operator allows for onSubmit to load with {props.onSubmit} or {event.preventDefault()}
//   - event.preventDefault prevents the page to refresh when onSubmit is triggered at the <form> tag
//   - inside <form> tag, we will wrap to {props.children} whenever we call <ModalOverlay> anywhere in this program
//   - our <Modal> tag will be called in PlaceItem.js (<PlaceItem> called from PlaceList.js), where we design the footer to have <Button> called to CLOSE our Modal
const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

// over here is our main export <Modal> component function
// Here, we want to use <CSSTransition> and <Backdrop>; 
//    - <Backdrop> uses CSS fixed position to grey out background
//    - <CSSTransition> provides animation
// the "in" prop for <CSSTransition> binds {props.show} - boolean from App.js, if true - show, if false - remove (invisible)
// once <Modal> is called from another .js file, we can pass a property called <Modal onCancel=...>, and that will be linked to trigger <BackDrop> grey transparent background
//      - if props.show is set to "true", then show Modal popup screen
//      - <Backdrop onClick> function is active also to allow grey background behind Modal screen
// at <ModalOverlay /> call, we have the spread operator "{}...props}" to forward/pass over props to the above ModalOverlay() function 
//      - for example, if we call <Modal footer=""> at another .js file, this forwards to <ModalOverlay {props.footer}/>
const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel}/>}
        <CSSTransition 
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames="modal"
        >
          <ModalOverlay {...props} />
        </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;