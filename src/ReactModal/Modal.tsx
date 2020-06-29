import React from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.scss";

ReactModal.setAppElement(document.body);

type ModalProps = {
    children: React.ReactNode,
    className?: string,
    isOpen: boolean,
}

export function Modal({children, className, isOpen, ...rest}: ModalProps) {
    return (
        <ReactModal className={styles.modal} overlayClassName={styles.overlay} isOpen={isOpen} {...rest}>
            {children}
        </ReactModal>
    );
}

type ModalHeaderProps = {
    children: React.ReactNode,
}

export function ModalHeader({children}: ModalHeaderProps) {
    return (
        <div className={styles.header}>{children}</div>
    );
}

type ModalBodyProps = {
    children: React.ReactNode,
}

export function ModalBody({children}: ModalBodyProps) {
    return (
        <div className={styles.body}>{children}</div>
    );
}

type ModalFooterProps = {
    children: React.ReactNode,
}

export function ModalFooter({children}: ModalFooterProps) {
    return (
        <div className={styles.footer}>{children}</div>
    );
}
