export class Updater {

    public static updateData(): void {

        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
        document.querySelector('#loader').classList.remove('d-none');

        setTimeout(() => {
            
            document.querySelector('#loader').classList.add('d-none');
            document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
            window.location.hash = '';

        
        }, 2000);

    }

    public static cleanHash(): void {

        window.location.hash = '';

    }

}