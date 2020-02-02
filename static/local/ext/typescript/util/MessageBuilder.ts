export class MessageBuilder {

    public static buildMessage(element: HTMLElement, type: string, message: any): void {

        if (type === 'id') return;

        if (type === 'text') {

            element.textContent = message;

        } else if (type === 'pages') {

            if (Array.isArray(message)) {

                message.forEach(messageObject => {

                    let liChild = document.createElement('LI');
                    let aChild  = document.createElement('A');
                        
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

                (element.parentNode.lastChild as HTMLElement).classList.add('active');
                
            } else {

                //throw an exception

            }

        } else {

            element.setAttribute(type, message);

        }

    }

}