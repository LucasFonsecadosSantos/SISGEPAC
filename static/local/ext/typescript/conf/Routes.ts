export class Routes {

    public static readonly ROUTES: Map<string, string> = new Map<string, string>([

        ['palestrante/salvar',              'SpeakerController@store'],
        ['palestrante/{id}/editar',         'SpeakerController@update'],
        ['palestrante/{id}/remover',        'SpeakerController@delete']

    ]);

}