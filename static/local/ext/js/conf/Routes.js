export class Routes {
}
Routes.ROUTES = new Map([
    ['palestrante/salvar', 'SpeakerController@store'],
    ['palestrante/{id}/editar', 'SpeakerController@update'],
    ['palestrante/{id}/remover', 'SpeakerController@delete']
]);
//# sourceMappingURL=Routes.js.map