import { UserState, UserStateType } from '../../util/userstate.js';
import { Route } from '../route.js';
import User from '../../util/user.js';
import { BagCheckoutEvent } from './bagbuffer.js';

declare let Mustache: any;
declare let axios: any;

export default class Bag extends Route {
    protected static adress = '/bag';
    protected static links: any[];
    static userState: any = new UserState();

    protected static async renderTemplate(app: Element, routeData: any) {
        const template = (await axios.get('http://localhost:3000/templates/orders/bag.mst')).data;
        app.innerHTML = Mustache.render(template, {
            items: routeData
        });
    }
    protected static async getRouteData(data: any, routeData: any) {
        return routeData;
    }
    protected static setLinkHandlers(app: Element, routeData: any) {
        this.links.forEach((link: any) => {
            this.setSubmitHandlers(link, routeData);
            this.setFlowerHandlers(link);
        });
    }
    protected static setLinks(app: Element) {
        this.links = Array.from(app.querySelectorAll('.router-link'));
        this.links.push(app.querySelector('#submit-btn'));
    }
    private static setSubmitHandlers(link: any, routeData: any) {
        if (link.id === 'submit-btn') {
            link.addEventListener('click', (event: any) => {
                this.renderAdresses(event, routeData);
            });
        }
    }
    private static setFlowerHandlers(link: any) {
        if (link.className === 'router-link') {
            link.addEventListener('click', this.goToFlower);
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
    private static async renderAdresses(event: any, routeData: any) {
        const template = (await axios.get('http://localhost:3000/templates/orders/adresses.mst')).data;
        const user = await User.getCurUser();
        const comp = Mustache.render(template, {
            items: user !== undefined ? user.adresses : [],
            isUser: this.userState.cur === UserStateType.USER ? true : false
        });
        const compContainer = document.getElementById('order-container-items');
        this.replaceChildren(compContainer, comp);
        await this.setAdressHandlers(compContainer, user, routeData);
    }
    private static replaceChildren(parent: Element, newChild: string) {
        parent.innerHTML = newChild;
    }
    private static async setAdressHandlers(parent: any, user: any, routeData: any) {
        const submitButton = parent.querySelector('#submit-btn');
        submitButton.addEventListener('click', (event: any) => event.preventDefault());
        if (user !== undefined) {
            submitButton.addEventListener('click', async () => {
                const adresses = Array.from(parent.querySelectorAll('.custom-control-input'));
                let curAdress: any = adresses.find((a: any) => a.checked);

                if (curAdress === undefined) {
                    const city = parent.querySelector('#city').value;
                    const number = parent.querySelector('#office').value;
                    const adressData = new FormData();
                    adressData.set('city', city);
                    adressData.set('office', number);
                    adressData.set('consumer', user._id);

                    const adress = (await axios.post('http://localhost:3000/adresses', adressData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })).data;

                    curAdress = adress._id
                } else {
                    curAdress = curAdress.value;
                }

                const orderData = new FormData();
                orderData.set('adress', curAdress);
                orderData.set('consumer', user._id);
                orderData.set('items', JSON.stringify(routeData));

                const order = (await axios.post('http://localhost:3000/orders', orderData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                window.dispatchEvent(new CustomEvent(BagCheckoutEvent));
            });
        } else {
            submitButton.addEventListener('click', async () => {
                const fullname = parent.querySelector('#fullname').value;
                const email = parent.querySelector('#email').value;
                const password = parent.querySelector('#password').value;

                const userData = new FormData();
                userData.set('email', email);
                userData.set('password', password);
                userData.set('fullname', fullname);

                const user = (await axios.post('http://localhost:3000/users', userData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;

                const city = parent.querySelector('#city').value;
                const number = parent.querySelector('#office').value;
                const adressData = new FormData();
                adressData.set('city', city);
                adressData.set('office', number);
                adressData.set('consumer', user._id);

                const adress = (await axios.post('http://localhost:3000/adresses', adressData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;

                const orderData = new FormData();
                orderData.set('adress', adress._id);
                orderData.set('consumer', user._id);
                orderData.set('items', JSON.stringify(routeData));

                await axios.post('http://localhost:3000/orders', orderData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                window.dispatchEvent(new CustomEvent(BagCheckoutEvent));
            });
        }
    }
}
