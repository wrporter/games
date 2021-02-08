import styles from "./modal.module.scss";

export class Modal {
    private modal: HTMLDivElement;
    private closeButton: HTMLButtonElement;
    private messageElement: HTMLParagraphElement;
    private afterCloseCallback: () => void;

    constructor() {
        this.modal = document.createElement('div');
        this.modal.className = styles.modal;
        this.closeButton = document.createElement('button');
        this.closeButton.className = styles.close;
        this.closeButton.innerText = 'Okay';
        this.messageElement = document.createElement('p');
        this.messageElement.className = styles.message;
        this.afterCloseCallback = () => {};
        this.closeButton.onclick = () => {
            this.close();
        };

        const content = document.createElement('div');
        content.className = styles.content;
        content.appendChild(this.messageElement);
        content.appendChild(this.closeButton);
        this.modal.appendChild(content);
    }

    public show(text: string) {
        this.messageElement.innerText = text;
        this.modal.style.display = "block";
        document.body.appendChild(this.modal);
    }

    public close() {
        this.modal.style.display = "none";
        if (this.afterCloseCallback) {
            this.afterCloseCallback();
        }
        this.modal.remove();
    }

    public afterClose(callback: () => void) {
        this.afterCloseCallback = callback;
    }
}
