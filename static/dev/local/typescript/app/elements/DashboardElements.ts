export class DashboardElements {

    public static readonly ELEMENTS: Map<string, HTMLElement> = new Map([

        ['title',                                   document.querySelector('title')],
        ['event-occurrence-title',                  document.querySelector('#event-occurrence-title')],
        ['event-information-title',                 document.querySelector('#event-information-title')],
        
        
        ['card02_label_event-name',                 document.querySelector('#card02_label_event-name')],
        ['card02_data_event-name',                  document.querySelector('#card02_data_event-name')],
        ['card02_label_event-edition',              document.querySelector('#card02_label_event-edition')],
        ['card02_data_event-edition',               document.querySelector('#card02_data_event-edition')],
        ['card02_label_event-description',          document.querySelector('#card02_label_event-description')],
        ['card02_data_event-description',           document.querySelector('#card02_data_event-description')],
        ['card02_label_event-institute',            document.querySelector('#card02_label_event-institute')],
        ['card02_data_event-institute',             document.querySelector('#card02_data_event-institute')],
        ['card02_label_event-type',                 document.querySelector('#card02_label_event-type')],
        ['card02_data_event-type',                  document.querySelector('#card02_data_event-type')],
        ['card02_label_event-area',                 document.querySelector('#card02_label_event-area')],
        ['card02_data_event-area',                  document.querySelector('#card02_data_event-area')],

        // //Card 03    
        ['card03_label_event-twitter',              document.querySelector('#card03_label_event-twitter')],
        ['card03_data_event-twitter',               document.querySelector('#card03_data_event-twitter')],
        ['card03_label_event-facebook',             document.querySelector('#card03_label_event-facebook')],
        ['card03_data_event-facebook',              document.querySelector('#card03_data_event-facebook')],
        ['card03_label_event-linkedin',             document.querySelector('#card03_label_event-linkedin')],
        ['card03_data_event-linkedin',              document.querySelector('#card03_data_event-linkedin')],
        ['card03_label_event-youtube',              document.querySelector('#card03_label_event-youtube')],
        ['card03_data_event-youtube',               document.querySelector('#card03_data_event-youtube')],
        ['card03_label_event-telephone',            document.querySelector('#card03_label_event-telephone')],
        ['card03_data_event-telephone',             document.querySelector('#card03_data_event-telephone')],
        ['card03_label_event-email',                document.querySelector('#card03_label_event-email')],
        ['card03_data_event-email',                 document.querySelector('#card03_data_event-email')],
        ['card03_label_event-website',              document.querySelector('#card03_label_event-website')],
        ['card03_data_event-website',               document.querySelector('#card03_data_event-website')],
        ['card03_label_event-instagram',            document.querySelector('#card03_label_event-instagram')],
        ['card03_data_event-instagram',             document.querySelector('#card03_data_event-instagram')],
        ['card03_label_event-contact-info',         document.querySelector('#card03_label_event-contact-info')],

        // //card04
        ['card04_label_title',                      document.querySelector('#card04_label_title')],

        // //Card 05
        ['speakerTable',                            document.querySelector('#speakerTable')],
        ['card05_button_create-speaker',            document.querySelector('#card05_button_create-speaker')],
        ['card05_button_create-speaker-icon',       document.querySelector('#card05_button_create-speaker-icon')],
        ['card05_button_create-speaker-text',       document.querySelector('#card05_button_create-speaker-text')],
        ['card05_label_title',                      document.querySelector('#card05_label_title')],
        ['card05_table_label_column01',             document.querySelector('#card05_table_label_column01')],
        ['card05_table_label_column02',             document.querySelector('#card05_table_label_column02')],
        ['card05_table_label_column03',             document.querySelector('#card05_table_label_column03')],
        ['card05_table_label_column04',             document.querySelector('#card05_table_label_column04')],
        ['card05_button_remove-speaker-text',       document.querySelector('#card05_button_remove-speaker-text')],
        ['card05_button_create-speaker-text',       document.querySelector('#card05_button_create-speaker-text')],
        ['card05_button_search-speaker-text',       document.querySelector('#card05_button_search-speaker-text')],
        
        // //Card 06
        ['card06_label_title',                      document.querySelector('#card06_label_title')],
        ['card06_button_create-activity',           document.querySelector('#card06_button_create-activity')],
        ['card06_button_create-activity-text',      document.querySelector('#card06_button_create-activity-text')],
        ['card06_button_search-activity',           document.querySelector('#card06_button_search-activity')],
        ['card06_button_search-activity-text',      document.querySelector('#card06_button_search-activity-text')],
        ['card06_button_delete-activity',           document.querySelector('#card06_button_delete-activity')],
        ['card06_button_delete-activity-text',      document.querySelector('#card06_button_delete-activity-text')],
        ['card06_table_label_column01',             document.querySelector('#card06_table_label_column01')],
        ['card06_table_label_column02',             document.querySelector('#card06_table_label_column02')],
        ['card06_table_label_column03',             document.querySelector('#card06_table_label_column03')],
        ['card06_table_label_column04',             document.querySelector('#card06_table_label_column04')],
        ['card06_table_label_column05',             document.querySelector('#card06_table_label_column05')],
        ['activityTable',                           document.querySelector('#activityTable')],

        // //Card 07
        ['card07_label_title',                          document.querySelector('#card07_label_title')],
        ['card07_table_label_column01',                 document.querySelector('#card07_table_label_column01')],
        ['card07_table_label_column02',                 document.querySelector('#card07_table_label_column02')],
        ['card07_table_label_column03',                 document.querySelector('#card07_table_label_column03')],
        ['card07_table_label_column04',                 document.querySelector('#card07_table_label_column04')],
        ['card07_button_create-sponsorshipplan-text',   document.querySelector('#card07_button_create-sponsorshipplan-text')],
        ['card07_button_delete-sponsorshipplan-text',   document.querySelector('#card07_button_delete-sponsorshipplan-text')],
        ['card07_button_search-sponsorshipplan-text',   document.querySelector('#card07_button_search-sponsorshipplan-text')],
        ['card07_button_create-sponsorshipplan',        document.querySelector('#card07_button_create-sponsorshipplan')],
        ['card07_button_delete-sponsorshipplan',        document.querySelector('#card07_button_delete-sponsorshipplan')],
        ['card07_button_search-sponsorshipplan',        document.querySelector('#card07_button_search-sponsorshipplan')],
        ['sponsorshipPlanTable',                        document.querySelector('#sponsorshipPlanTable')],

        // //Card08
        ['card08_button_create-sponsorship',            document.querySelector('#card08_button_create-sponsorship')],
        ['card08_button_delete-sponsorship',            document.querySelector('#card08_button_delete-sponsorship')],
        ['card08_button_search-sponsorship',            document.querySelector('#card08_button_search-sponsorship')],
        ['card08_button_create-sponsorship-text',       document.querySelector('#card08_button_create-sponsorship-text')],
        ['card08_button_search-sponsorship-text',       document.querySelector('#card08_button_search-sponsorship-text')],
        ['card08_button_delete-sponsorship-text',       document.querySelector('#card08_button_delete-sponsorship-text')],
        ['card08_label_title',                          document.querySelector('#card08_label_title')],
        ['card08_table_label_column01',                 document.querySelector('#card08_table_label_column01')],
        ['card08_table_label_column02',                 document.querySelector('#card08_table_label_column02')],
        ['card08_table_label_column03',                 document.querySelector('#card08_table_label_column03')],
        ['card08_table_label_column04',                 document.querySelector('#card08_table_label_column04')],
        ['card08_table_label_column05',                 document.querySelector('#card08_table_label_column05')],
        ['sponsorshipTable',                            document.querySelector('#sponsorshipTable')],

        // //Card 09
        ['card09_label_title',                          document.querySelector('#card09_label_title')],

        // //Card 010
        ['card010_label_title',                         document.querySelector('#card010_label_title')],
        ['card010_table_label_column01',                document.querySelector('#card010_table_label_column01')],
        ['card010_table_label_column02',                document.querySelector('#card010_table_label_column02')],
        ['card010_table_label_column03',                document.querySelector('#card010_table_label_column03')],

    ]);

}