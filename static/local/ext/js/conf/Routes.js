export class Routes {
}
Routes.ROUTES = new Map([
    ['palestrante/salvar', 'SpeakerController@store'],
    ['palestrante/{id}/editar', 'SpeakerRegisterModalController@update'],
    ['palestrante/{id}/remover', 'SpeakerController@delete']
]);
//# sourceMappingURL=Routes.js.map