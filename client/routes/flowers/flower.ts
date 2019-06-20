import { Route } from '../route.js'
import User from '../../util/user.js'
import { UserState, UserStateType } from '../../util/userstate.js';

declare let axios: any;
declare let Mustache: any;

export default class Flower extends Route {
    protected static adress = '/flower';
    protected static links: any[];
    static userState: any = new UserState();
    static async render(data: any) {
        const app = document.getElementById('app');
        if (app !== null) {
            //const flowers = (await axios.get(`http://localhost:3000/flowers/${data.id}`)).data;
            //const template = (await axios.get('http://localhost:3000/templates/flower.mst')).data;
            app.innerHTML = ''
            // Flower.links = [app.querySelector('#flowerForm'));
            // Flower.setLinks();
        }
    }
    // protected static setLinks() {
    //     Flower.links.forEach((link: any) => {
    //         if (link.id === 'flowerForm') {
    //             link.addEventListener('submit', preventFormSubmittion);
    //             link.addEventListener('submit', Flower.addFlower);
    //         }
    //     });
    //     function preventFormSubmittion(event: any) {
    //         event.preventDefault();
    //     }
    // }
    // private static async addFlower() {
    //     const form = Flower.links.find((l: any) => l.id === 'flowerForm');
    //     const name = form.querySelector('#name').value;
    //     const price = form.querySelector('#price').value;
    //     const photo = form.querySelector('#photo').value;


    //     const flowerData = new FormData();
    //     flowerData.set('name', name);
    //     flowerData.set('price', price);
    //     flowerData.set('photo', photo);

    //     const flower = (await axios.post('http://localhost:3000/flowers', flowerData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })).data;

    //     history.pushState({}, '', '/flower');
    //     window.dispatchEvent(new CustomEvent('popstate', {
    //         detail: {
    //             id: flower._id
    //         },
    //     }));
    // }
}   