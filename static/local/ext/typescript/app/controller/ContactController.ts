import { Controller } from "./../../core/Controller.js";

export class ContactController extends Controller {

    private _titleElement: HTMLTitleElement;
    private _textElements: Array<HTMLElement>;
    private _inputElements: Array<HTMLElement>;
    private _buttonElements: Array<HTMLElement>;
    private _changelogContent: HTMLElement;

    constructor() {

        super();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();

    }

    private _getPageMessages(): void {
        
        fetch('/local/data/messages.json')
            
            .then(response => response.json())
            
            .then(data => {

                this._buildPageMessages(data);

            });

    }

    private _initializeElements(): void {

        this._textElements      = new Array<HTMLElement>();
        this._buttonElements    = new Array<HTMLElement>();
        this._inputElements     = new Array<HTMLElement>();

        this._changelogContent                          = document.getElementById('changelog-content');
        this._titleElement                              = document.getElementsByTagName('title')[0];
        this._textElements['body-title']                = document.getElementById('page-body-title');
        
    }

    private _buildPageMessages(data): void {
        
        this._titleElement.textContent                  = data['page-title'];
        this._textElements['body-title'].innerHTML     += data['page-body-title'];
    }

    private _getPageContent(): void {
        
        fetch('/local/data/changelog.json')
            
            .then(response => response.json())
            
            .then(data => {
                
                this._buildPageContent(data);
            
            });

    }

    private _buildPageContent(data): void {

        let cardElement;
        let cardContentElement;
        let h5Element;
        let spanBadgeElement;
        let divClearBothElement;
        let ulListElement;
        let liListElement;

        let changes = this._getChangesArray(data);
        

        changes.forEach((element, index) => {

            cardElement = document.createElement('DIV');
            cardElement.classList.add('card');

            cardContentElement = document.createElement('DIV');
            cardContentElement.classList.add('card-content');
            
            h5Element = document.createElement('H5');
            h5Element.classList.add('card-title');
            h5Element.textContent = 'v ' + element[0]['version'] + ' - ' + element[0]['launch_date'];
            cardContentElement.appendChild(h5Element);
            
            let newChange       = this._getChangeOfTypeArray(element, '_NEW_');
            let removedChange   = this._getChangeOfTypeArray(element, '_REMOVED_');
            let improvedChange  = this._getChangeOfTypeArray(element, '_IMPROVED_');
            let fixedChange     = this._getChangeOfTypeArray(element, '_FIXED_');


            spanBadgeElement = document.createElement('SPAN');
            spanBadgeElement.classList.add('badge','light-blue','float-left','ml-0','mt-1')
            spanBadgeElement.textContent = 'Corrigido';
            cardContentElement.appendChild(spanBadgeElement);

            divClearBothElement = document.createElement('DIV');
            divClearBothElement.classList.add('clear-both');
            cardContentElement.appendChild(divClearBothElement);

            ulListElement = document.createElement('UL');
            ulListElement.classList.add('list-type-bullet');
            cardContentElement.appendChild(ulListElement);

            fixedChange.forEach(change => {
                
                liListElement = document.createElement('LI');
                liListElement.textContent = change['content'];
                ulListElement.appendChild(liListElement);
            });


            //NEW
            spanBadgeElement = document.createElement('SPAN');
            spanBadgeElement.classList.add('badge','green','float-left','ml-0','mt-1')
            spanBadgeElement.textContent = 'Novo';
            cardContentElement.appendChild(spanBadgeElement);

            divClearBothElement = document.createElement('DIV');
            divClearBothElement.classList.add('clear-both');
            cardContentElement.appendChild(divClearBothElement);

            ulListElement = document.createElement('UL');
            ulListElement.classList.add('list-type-bullet');
            cardContentElement.appendChild(ulListElement);

            newChange.forEach(change => {

                liListElement = document.createElement('LI');
                liListElement.textContent = change['content'];
                ulListElement.appendChild(liListElement);

            });
                

            //IMPROVED
            spanBadgeElement = document.createElement('SPAN');
            spanBadgeElement.classList.add('badge','purple','float-left','ml-0','mt-1')
            spanBadgeElement.textContent = 'Melhorado';
            cardContentElement.appendChild(spanBadgeElement);

            divClearBothElement = document.createElement('DIV');
            divClearBothElement.classList.add('clear-both');
            cardContentElement.appendChild(divClearBothElement);

            ulListElement = document.createElement('UL');
            ulListElement.classList.add('list-type-bullet');
            cardContentElement.appendChild(ulListElement);

            improvedChange.forEach(change => {

                liListElement = document.createElement('LI');
                liListElement.textContent = change['content'];
                ulListElement.appendChild(liListElement);
            

            });


            //REMOVED
            spanBadgeElement = document.createElement('SPAN');
            spanBadgeElement.classList.add('badge','red','float-left','ml-0','mt-1')
            spanBadgeElement.textContent = 'Removido';
            cardContentElement.appendChild(spanBadgeElement);

            divClearBothElement = document.createElement('DIV');
            divClearBothElement.classList.add('clear-both');
            cardContentElement.appendChild(divClearBothElement);

            ulListElement = document.createElement('UL');
            ulListElement.classList.add('list-type-bullet');
            cardContentElement.appendChild(ulListElement);

            removedChange.forEach(change => {
                
                liListElement = document.createElement('LI');
                liListElement.textContent = change['content'];
                ulListElement.appendChild(liListElement);
            

            });
            
             
            cardElement.appendChild(cardContentElement);
            this._changelogContent.appendChild(cardElement);

        });

    }
    
    private _getChangeOfTypeArray(element, type): Array<any> {

        let data = [];

        element.forEach(change => {
            
            if (change['type'] === type) {
                data.push(change);
            }

        });

        return data;

    }

    private _getChangesArray(data): Array<any> {
        
        let currentIndex    = 0;
        let oldIndex        = -1;
        let changes         = [];

        data.forEach(element => {

            currentIndex = element['id_changelog'];

            if (currentIndex != oldIndex) {
                changes[currentIndex] = new Array();
                changes[currentIndex].push(element);
            
            } else {

                changes[oldIndex].push(element);

            }

            oldIndex = currentIndex;
        });

        return changes;
    }
}