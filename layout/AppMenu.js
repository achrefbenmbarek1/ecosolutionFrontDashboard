import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { useRouter } from 'next/router';
import { removeCookie } from '../demo/utils/cookieUtils';

const AppMenu = () => {
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const LOGOUT_ENDPOINT = BASE_URL + '/admin/logout'
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const handleLogout = async () => {
        const response = await fetch(LOGOUT_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            removeCookie('authenticated');
            router.push('/');
        }
    }
    const model = [

        {
            icon: 'pi pi-fw pi-home',
            label: 'Dashboard',
            items: [
                { label: 'Info Formulaire de devis', icon: 'pi pi-fw pi-user', to: '/coordonneClient' },
                {
                    label: 'Services ',
                    icon: 'pi pi-fw pi-share-alt',
                    items: [
                        {
                            label: 'Ajouter Service',
                            icon: 'pi pi-fw pi-plus',
                            to: '/services/ajout_service'
                        },
                        {
                            label: 'Tout les Services',
                            icon: 'pi pi-fw pi-search',
                            to: '/services'
                        }
                    ]
                },

                {
                    label: 'Projet ',
                    icon: 'pi pi-fw pi-sun',
                    items: [
                        {
                            label: 'Ajouter Projet',
                            icon: 'pi pi-fw pi-plus',
                            to: '/projet/ajout_projet'
                        },
                        {
                            label: 'Tout les Projet',
                            icon: 'pi pi-fw pi-search',
                            to: '/projet'
                        }
                    ]
                },

                {
                    label: 'Article',
                    icon: 'pi pi-fw  pi-id-card',
                    items: [
                        {
                            label: 'Ajouter Article',
                            icon: 'pi pi-fw pi-plus',
                            to: '/articles/ajout_article'
                        },
                        {
                            label: 'Tout les Articles',
                            icon: 'pi pi-fw pi-search',
                            to: '/articles'
                        }
                    ]
                },

                { label: 'Info Contact', icon: 'pi pi-fw pi-info-circle', to: '/contactInfo' },
                { label: 'Puissance', icon: 'pi pi-fw pi-bolt', to: '/puissance' },
                { label: 'Indicateur', icon: 'pi pi-fw pi-chart-pie', to: '/indicateur' },
                { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: handleLogout }
            ]
        },
        // {
        //     label: 'Partie Front',
        //     items: [{ label: 'Aller sur le site web', icon: 'pi pi-fw pi-globe', to: '/landing' }]
        // }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
