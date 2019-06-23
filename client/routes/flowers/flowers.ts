import { Route } from '../route.js'
import { UserState, UserStateType } from '../../util/userstate.js';
import { BagBufferEvent } from '../orders/bagbuffer.js';

declare let axios: any;
declare let Mustache: any;

export default class Flowers extends Route {
    protected static adress = '/flowers';
    protected static links: any[];
    static userState: any = new UserState();    
    protected static async renderTemplate(app: Element, routeData: any) { 
        const template = (await axios.get('http://localhost:3000/templates/flowers/flowers.mst')).data;
        app.innerHTML = Mustache.render(template, {
            items: routeData,
            isAdmin: this.userState.cur === UserStateType.ADMIN ? true : false
        });
    }
    protected static async getRouteData(data: any, routeData: any) {
        if (routeData === undefined) {
            return (await axios.get('http://localhost:3000/flowers')).data;
        }
        return routeData;
    }
    protected static setLinks(app: Element) {
        this.links = [app.querySelector('#flowerForm')]
            .concat(Array.from(app.querySelectorAll('.router-link')))
            .concat(Array.from(app.querySelectorAll('#delete-btn')))
            .concat(Array.from(app.querySelectorAll('#buy-btn')));
    }
    protected static setLinkHandlers(app: Element, routeData: any) {
        this.links.forEach((link: any) => {
            if (link !== null) {
                if (link.id === 'flowerForm') {
                    link.addEventListener('submit', preventDefaultEvent);
                    link.addEventListener('submit', Flowers.addFlower);
                } else if (link.id === 'delete-btn') {
                    link.addEventListener('click', Flowers.deleteFlower);
                } else if (link.id === 'buy-btn') {
                    link.addEventListener('click', (event: any) => {
                        const flowerId = event.target.getAttribute('data-id');
                        window.dispatchEvent(new CustomEvent(BagBufferEvent, {
                            detail: {
                                item: routeData.find((i: any) => i._id === flowerId)
                            }
                        }));
                        preventDefaultEvent(event);
                    });
                } else {
                    link.addEventListener('click', Flowers.goToFlower);
                }
            }
        });
        function preventDefaultEvent(event: any) {
            event.preventDefault();
        }
    }
    private static goToFlower(event: any) {
        const flowerId = event.target.getAttribute('data-id');
        history.pushState({}, '', '/flower');
        window.dispatchEvent(new CustomEvent('popstate', {
            detail: {
                id: flowerId
            },
        }));
        event.preventDefault();
    }
    private static async deleteFlower(event: any) {
        const flowerId = event.target.getAttribute('data-id');
        const deleted = (await axios.delete(`http://localhost:3000/flowers/${flowerId}`)).data;
        if (deleted !== undefined) {
            const deletedFlowerCard = document.getElementById(flowerId);
            if (deletedFlowerCard !== null) {
                deletedFlowerCard.parentNode.removeChild(deletedFlowerCard);
            }
        }
        event.preventDefault();
    }
    private static async addFlower(event: any) {
        const form = Flowers.links.find((l: any) => l.id === 'flowerForm');
        const name = form.querySelector('#name').value;
        const price = form.querySelector('#price').value;
        const photo = form.querySelector('#photo').files[0];

        const flowerData = new FormData();
        flowerData.set('name', name);
        flowerData.set('price', price);
        flowerData.set('photo', photo);

        const flower = (await axios.post('http://localhost:3000/flowers/', flowerData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;

        Flowers.closeModal();

        const template = (await axios.get('http://localhost:3000/templates/flowers/flower.mst')).data;
        const cards = document.querySelector('#card-set');
        const card: Node = Mustache.render(template, {
            item: flower
        });
        cards.appendChild(card);
    }

    private static closeModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('style', 'display: none');
    }
}   