export class Routes {
}
Routes.ROUTES = new Map([
    ['', 'DashboardController@reload'],
    ['palestrante/listar', 'DashboardController@init'],
    ['palestrante/{id}/cadastrar', 'SpeakerRegisterModalController@create'],
    ['palestrante/{id}/editar', 'SpeakerRegisterModalController@update'],
    ['palestrante/{id}/remover', 'SpeakerRegisterModalController@delete'],
    ['atividade/{id}/cadastrar', 'ActivityRegisterModalController@create']
]);
//# sourceMappingURL=Routes.js.map