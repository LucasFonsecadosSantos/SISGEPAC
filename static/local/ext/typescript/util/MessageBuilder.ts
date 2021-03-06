export class MessageBuilder {

    public static buildMessage(element: HTMLElement, type: string, message: any): void {

        if ((type === 'id') || (type === 'tag')) return;

        if (type === 'text') {

            element.textContent = message;

        } else if (type === 'pages') {

            if (Array.isArray(message)) {
                
                let liChild:    HTMLElement;
                let aChild:     HTMLElement;

                message.forEach(messageObject => {

                    liChild = document.createElement('LI');
                    aChild  = document.createElement('A');
                        
                    liChild.classList.add('breadcrumb-item');
                    
                    Object.keys(messageObject).forEach(key => {

                        if (key === 'text') {

                            aChild.textContent = messageObject[key];

                        } else {

                            aChild.setAttribute(key, messageObject[key]);

                        }

                    });
                    
                    liChild.appendChild(aChild);

                    element.appendChild(liChild);

                });

                liChild.classList.add('active');
                
            } else {

                //throw an exception

            }

        } else {

            element.setAttribute(type, message);

        }

    }

}