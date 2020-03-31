import { Component } from './../../core/Component.js';

export class SpeakerTableComponent extends Component {


    public getStructure(data: Object): DocumentFragment {

        let fragment = document.createDocumentFragment();
        let trFragment = document.createDocumentFragment();
        let fragmentMaster = document.createDocumentFragment();
        
        if (Array.isArray(data)) {

            if (data.length > 0) {

                data.forEach(speaker => {
                    
                    let trElement = document.createElement('TR');
                    let tdElement = document.createElement('TD');
                    let spanElement = document.createElement('SPAN');
                    let imgElement = document.createElement('IMG');


                    tdElement.className = 'text-center';
                    spanElement.classList.add('avatar','avatar-busy');
                    imgElement.setAttribute('src', "/remote/data/uploads/images/profile/" + speaker['avatar']);
                    imgElement.setAttribute('alt', speaker['name']);
                    imgElement.setAttribute('title', speaker['name']);
                    imgElement.setAttribute('data-toogle', 'tooltip');
                    imgElement.setAttribute('data-placement', 'right');
                    
                    spanElement.appendChild(imgElement);
                    tdElement.appendChild(spanElement);
                    fragment.appendChild(tdElement);

                    //cell 02
                    tdElement = document.createElement('TD');
                    let aElement = document.createElement('A');
                    aElement.className = "text-bold-600";
                    aElement.textContent = speaker['name'];
                    let pElement = document.createElement('P');
                    pElement.className = 'text-muted';
                    pElement.textContent = speaker['jobInstitute'];
                    tdElement.appendChild(aElement);
                    tdElement.appendChild(pElement);
                    pElement = document.createElement('P');
                    pElement.className = 'text-muted';
                    pElement.textContent = speaker['description'];
                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);

                    //cell03
                    tdElement = document.createElement('TD');
                    tdElement.classList.add('text-truncate','p-1');
                    let ulElement = document.createElement('UL');
                    //TODO IMPLEMENTAR ATIVIDADES
                    tdElement.appendChild(ulElement);
                    fragment.appendChild(tdElement);

                    //cell04
                    tdElement = document.createElement('TD');
                    tdElement.className = 'text-center';
                    let btnGroup = document.createElement('DIV');
                    btnGroup.className = 'btn-group';
                    btnGroup.setAttribute('role', 'group');
                    let buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
                    buttonElement.setAttribute('type','button');
                    buttonElement.setAttribute('data-toogle','tooltip');
                    buttonElement.setAttribute('data-popup','tooltip-custom');
                    buttonElement.setAttribute('data-original-title','Editar cadastro de ' + speaker['name']);
                    let iElement = document.createElement('I');
                    iElement.classList.add('la','la-edit');
                    buttonElement.appendChild(iElement);

                    buttonElement.addEventListener('click', event => {

                        location.hash = 'palestrante/' + speaker['id'] + '/editar';

                    });
                    btnGroup.appendChild(buttonElement);
                    
                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
                    buttonElement.setAttribute('type','button');
                    buttonElement.setAttribute('data-toogle','tooltip');
                    buttonElement.setAttribute('data-popup','tooltip-custom');
                    buttonElement.setAttribute('data-original-title','Visualizar cadastro de ' + speaker['name']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la','la-eye');
                    buttonElement.appendChild(iElement);
                    btnGroup.appendChild(buttonElement);

                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn','btn-icon','btn-red','btn-sm');
                    buttonElement.setAttribute('type','button');
                    buttonElement.setAttribute('data-toogle','tooltip');
                    buttonElement.setAttribute('data-popup','tooltip-custom');
                    buttonElement.setAttribute('data-original-title','Remover cadastro de ' + speaker['name']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la','la-trash');
                    buttonElement.appendChild(iElement);
                    buttonElement.addEventListener('click', event => {

                        location.hash = 'palestrante/' + speaker['id'] + '/remover';

                    });
                    btnGroup.appendChild(buttonElement);
                    tdElement.appendChild(btnGroup);

                    
                    fragment.appendChild(tdElement);
                    trElement.appendChild(fragment);
                    fragmentMaster.appendChild(trElement);
                    
                });

            } else {

                let trElement = document.createElement('TR');
                let tdElement = document.createElement('TD');
                let pElement  = document.createElement('P');
                tdElement.setAttribute('colspan', '4');
                tdElement.className = "text-center";
                pElement.className = "text-muted";
                pElement.textContent = "Nenhum palestrante foi registrado até o momento.";

                tdElement.appendChild(pElement);
                fragment.appendChild(tdElement);
                trElement.appendChild(fragment)

            }
        }
        
        return fragmentMaster;

    }
}