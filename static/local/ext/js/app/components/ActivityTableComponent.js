import { Component } from './../../core/Component.js';
export class ActivityTableComponent extends Component {
    getStructure(data) {
        let fragment = document.createDocumentFragment();
        let trFragment = document.createDocumentFragment();
        let fragmentMaster = document.createDocumentFragment();
        if (Array.isArray(data)) {
            if (data.length > 0) {
                data.forEach(activity => {
                    //console.log(activity);
                    let trElement = document.createElement('TR');
                    let tdElement = document.createElement('TD');
                    let spanElement = document.createElement('SPAN');
                    let imgElement = document.createElement('IMG');
                    let linkElement = document.createElement('A');
                    tdElement.style.width = "10%";
                    tdElement.className = 'text-center';
                    spanElement.classList.add('avatar', 'avatar-busy');
                    imgElement.setAttribute('src', "/remote/data/uploads/images/profile/" + activity['speaker'][0]['avatar']);
                    imgElement.setAttribute('alt', activity['title']);
                    imgElement.setAttribute('title', activity['title']);
                    imgElement.setAttribute('data-toogle', 'tooltip');
                    imgElement.setAttribute('data-placement', 'right');
                    linkElement.className = 'text-bold-600';
                    linkElement.textContent = activity['speaker'][0]['name'];
                    linkElement.addEventListener('click', event => {
                        location.hash = 'palestrante/' + activity['speaker'][0]['id'] + '/editar';
                    });
                    spanElement.appendChild(imgElement);
                    tdElement.appendChild(spanElement);
                    tdElement.appendChild(document.createElement('BR'));
                    tdElement.appendChild(linkElement);
                    fragment.appendChild(tdElement);
                    //cell 02
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "60%";
                    let aElement = document.createElement('A');
                    aElement.className = "text-bold-600";
                    aElement.textContent = activity['title'];
                    let pElement = document.createElement('P');
                    pElement.classList.add('text-muted', 'font-small-3');
                    pElement.textContent = activity['description'];
                    tdElement.appendChild(aElement);
                    tdElement.appendChild(pElement);
                    pElement.style.wordBreak = "break-all";
                    pElement.style.wordWrap = "break-word";
                    pElement.style.whiteSpace = "normal";
                    fragment.appendChild(tdElement);
                    //cell03
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    pElement = document.createElement('P');
                    pElement.classList.add('text-muted', 'success', 'font-small-3');
                    pElement.textContent = activity['start_date'] + " - " + activity['start_time'];
                    tdElement.appendChild(pElement);
                    pElement = document.createElement('P');
                    pElement.classList.add('text-muted', 'danger', 'font-small-3');
                    pElement.textContent = activity['end_date'] + " - " + activity['end_time'];
                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);
                    //cell 04
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    let badgeElement;
                    pElement = document.createElement('P');
                    if ((activity['track'] !== undefined) && (activity['track'].length > 0)) {
                        activity['track'].forEach(track => {
                            badgeElement = document.createElement('DIV');
                            badgeElement.classList.add('badge', 'border-left-danger', 'badge-striped');
                            badgeElement.textContent = track['name'];
                            tdElement.appendChild(badgeElement);
                        });
                    }
                    else {
                        pElement.textContent = "Nenhum";
                    }
                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);
                    //cell05
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    tdElement.className = 'text-center';
                    let btnGroup = document.createElement('DIV');
                    btnGroup.className = 'btn-group';
                    btnGroup.setAttribute('role', 'group');
                    let buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn', 'btn-icon', 'btn-secondary', 'btn-sm');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.setAttribute('data-toogle', 'tooltip');
                    buttonElement.setAttribute('data-popup', 'tooltip-custom');
                    buttonElement.setAttribute('data-original-title', 'Editar cadastro da atividade ' + activity['title']);
                    let iElement = document.createElement('I');
                    iElement.classList.add('la', 'la-edit');
                    buttonElement.appendChild(iElement);
                    buttonElement.addEventListener('click', event => {
                        location.hash = 'atividade/' + activity['id'] + '/editar';
                    });
                    btnGroup.appendChild(buttonElement);
                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn', 'btn-icon', 'btn-secondary', 'btn-sm');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.setAttribute('data-toogle', 'tooltip');
                    buttonElement.setAttribute('data-popup', 'tooltip-custom');
                    buttonElement.setAttribute('data-original-title', 'Visualizar cadastro da atividade ' + activity['title']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la', 'la-eye');
                    buttonElement.appendChild(iElement);
                    btnGroup.appendChild(buttonElement);
                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn', 'btn-icon', 'btn-red', 'btn-sm');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.setAttribute('data-toogle', 'tooltip');
                    buttonElement.setAttribute('data-popup', 'tooltip-custom');
                    buttonElement.setAttribute('data-original-title', 'Remover atividade ' + activity['title']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la', 'la-trash');
                    buttonElement.appendChild(iElement);
                    buttonElement.addEventListener('click', event => {
                        location.hash = 'atividade/' + activity['id'] + '/remover';
                    });
                    btnGroup.appendChild(buttonElement);
                    tdElement.appendChild(btnGroup);
                    fragment.appendChild(tdElement);
                    trElement.appendChild(fragment);
                    fragmentMaster.appendChild(trElement);
                });
            }
            else {
                let trElement = document.createElement('TR');
                let tdElement = document.createElement('TD');
                let pElement = document.createElement('P');
                tdElement.setAttribute('colspan', '5');
                tdElement.className = "text-center";
                pElement.className = "text-muted";
                pElement.textContent = "Nenhum palestrante foi registrado até o momento.";
                tdElement.appendChild(pElement);
                fragment.appendChild(tdElement);
                trElement.appendChild(fragment);
                fragmentMaster.appendChild(trElement);
            }
        }
        return fragmentMaster;
    }
}
//# sourceMappingURL=ActivityTableComponent.js.map