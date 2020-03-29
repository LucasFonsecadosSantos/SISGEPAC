export class Routes {

    public static readonly ROUTES: Map<string, string> = new Map<string, string>([

        ['',                                'DashboardController@reload'],
        ['palestrante/listar',              'DashboardController@init'],
        ['palestrante/{id}/cadastrar',      'SpeakerRegisterModalController@create'],
        ['palestrante/{id}/editar',         'SpeakerRegisterModalController@update'],
        ['palestrante/{id}/remover',        'SpeakerRegisterModalController@delete'],
        ['atividade/{id}/cadastrar',        'ActivityRegisterModalController@create'],
        ['atividade/{id}/editar',           'ActivityRegisterModalController@update'],
        ['atividade/{id}/remover',          'ActivityRegisterModalController@delete'],
        ['planopatrocinio/{id}/remover',    'SponsorshipPlanModalController@delete'],
        ['planopatrocinio/{id}/editar',     'SponsorshipPlanModalController@update'],
        ['planopatrocinio/{id}/cadastrar',  'SponsorshipPlanModalController@create'],

    ]);

}