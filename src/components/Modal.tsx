import { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 700px;
  height: 700px;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: FC<ModalPropsType> = ({ open, onClose, children }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }
    if (open) {
      body.style.overflowY = "hidden";
      body.style.height = "100%";
    } else {
      body.style.overflowY = "visible";
      body.style.height = "auto";
    }
  }, [open]);
  return (
    <>
      {open && (
        <Overlay
          id="overlay"
          onClick={(e) => {
            e.stopPropagation();
            console.log((e.target as HTMLDivElement).id);
            (e.target as HTMLDivElement).id === "overlay" && onClose();
          }}
        >
          <ModalContainer>
            <button onClick={() => onClose()}>x</button>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};
