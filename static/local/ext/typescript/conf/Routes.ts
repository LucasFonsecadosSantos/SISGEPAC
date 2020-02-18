export class Routes {

    public static readonly ROUTES: Map<string, string> = new Map<string, string>([

        ['',                                'DashboardController@reload'],
        ['palestrante/listar',              'DashboardController@init'],
        ['palestrante/{id}/cadastrar',      'SpeakerRegisterModalController@create'],
        ['palestrante/{id}/editar',         'SpeakerRegisterModalController@update'],
        ['palestrante/{id}/remover',        'SpeakerRegisterModalController@delete']

    ]);

}