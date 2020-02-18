export class Routes {
}
Routes.ROUTES = new Map([
    ['', 'DashboardController@reload'],
    ['palestrante/listar', 'DashboardController@init'],
    ['palestrante/{id}/cadastrar', 'SpeakerRegisterModalController@create'],
    ['palestrante/{id}/editar', 'SpeakerRegisterModalController@update'],
    ['palestrante/{id}/remover', 'SpeakerController@delete']
]);
//# sourceMappingURL=Routes.js.map