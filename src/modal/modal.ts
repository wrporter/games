import "./modal.less";

export class Modal {
    private modal: HTMLDivElement;
    private closeButton: HTMLButtonElement;
    private messageElement: HTMLParagraphElement;
    private afterCloseCallback: () => void;

    constructor() {
        this.modal = document.getElementsByClassName("modal")[0] as HTMLDivElement;
        this.closeButton = document.getElementsByClassName("modal-close")[0] as HTMLButtonElement;
        this.messageElement = document.getElementsByClassName("modal-message")[0] as HTMLParagraphElement;
        this.closeButton.onclick = () => {
            this.close();
        };
    }

    public show(text: string) {
        this.messageElement.innerText = text;
        this.modal.style.display = "block";
    }

    public close() {
        this.modal.style.display = "none";
        if (this.afterCloseCallback) {
            this.afterCloseCallback();
        }
    }

    public afterClose(callback: () => void) {
        this.afterCloseCallback = callback;
    }
}
