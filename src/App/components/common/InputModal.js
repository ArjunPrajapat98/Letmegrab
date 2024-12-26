import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CommonButton from "./CommonButton";
// import { Loader } from "../Loader";

const InputModal = (props) => {
  const {
    className,
    isOpen,
    toggle,
    onSubmit,
    headerName,
    submitLabel,
    inputProps,
    disabled = false,
    mxSize,
    fullscreen = false,
    btnClass = "",
    buttonFlex = false,
    cancelLabel = "Cancel",
    onCancel,
    loading = false,
    canDisabled = false,
    footer = true,
    isHideSubmitButton=true
  } = props;

  return (
    <div>
      <Modal
        fullscreen={fullscreen}
        size={mxSize}
        isOpen={isOpen}
        toggle={toggle}
        className={className}
        backdrop="static"
        keyboard
        centered={true}
      >
        <ModalHeader toggle={toggle}>{headerName}</ModalHeader>
        <ModalBody>{inputProps}</ModalBody>
        <ModalFooter className="mt-3">
          <button
            disabled={canDisabled}
            onClick={toggle}
            className="close_commonBtn"
          >
            {cancelLabel}
          </button>
         {isHideSubmitButton ? <CommonButton onClick={onSubmit} disabled={disabled || loading} name={submitLabel}></CommonButton> : <></>}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InputModal;
