export const Modal = ({message, onModalSubmit}) => {
    return(
        <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onModalSubmit}>CLOSE</button>
      </div>
    </div>
    )
}