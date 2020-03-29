export class Routes {
}
Routes.ROUTES = new Map([
    ['', 'DashboardController@reload'],
    ['palestrante/listar', 'DashboardController@init'],
    ['palestrante/{id}/cadastrar', 'SpeakerModalController@create'],
    ['palestrante/{id}/editar', 'SpeakerModalController@update'],
    ['palestrante/{id}/remover', 'SpeakerModalController@delete'],
    ['atividade/{id}/cadastrar', 'ActivityModalController@create'],
    ['atividade/{id}/editar', 'ActivityModalController@update'],
    ['atividade/{id}/remover', 'ActivityModalController@delete'],
    ['planopatrocinio/{id}/remover', 'SponsorshipPlanModalController@delete'],
    ['planopatrocinio/{id}/editar', 'SponsorshipPlanModalController@update'],
    ['planopatrocinio/{id}/cadastrar', 'SponsorshipPlanModalController@create'],
]);
//# sourceMappingURL=Routes.js.map