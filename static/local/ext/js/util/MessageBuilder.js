export class MessageBuilder {
    static buildMessage(element, type, message) {
        if (type === 'id')
            return;
        if (type === 'text') {
            element.textContent = message;
        }
        else if (type === 'pages') {
            if (Array.isArray(message)) {
                let liChild;
                let aChild;
                message.forEach(messageObject => {
                    liChild = document.createElement('LI');
                    aChild = document.createElement('A');
                    liChild.classList.add('breadcrumb-item');
                    Object.keys(messageObject).forEach(key => {
                        if (key === 'text') {
                            aChild.textContent = messageObject[key];
                        }
                        else {
                            aChild.setAttribute(key, messageObject[key]);
                        }
                    });
                    liChild.appendChild(aChild);
                    element.appendChild(liChild);
                });
                liChild.classList.add('active');
            }
            else {
                //throw an exception
            }
        }
        else {
            element.setAttribute(type, message);
        }
    }
}
//# sourceMappingURL=MessageBuilder.js.map