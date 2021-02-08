import React from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.scss";
import {Box} from "@material-ui/core";

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
        <Box bgcolor="background.paper" className={styles.header}>{children}</Box>
    );
}

type ModalBodyProps = {
    children: React.ReactNode,
}

export function ModalBody({children}: ModalBodyProps) {
    return (
        <Box bgcolor="background.paper" className={styles.body}>{children}</Box>
    );
}

type ModalFooterProps = {
    children: React.ReactNode,
}

export function ModalFooter({children}: ModalFooterProps) {
    return (
        <Box bgcolor="background.paper" className={styles.footer}>{children}</Box>
    );
}
