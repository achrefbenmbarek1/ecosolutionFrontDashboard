import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';
import getConfig from 'next/config';

const PanelDemo = () => {
    const router = useRouter();
    const [projetCardsContent, setProjetCardsContent] = useState([]);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const GET_PROJECTS_ENDPOINT = BASE_URL + '/projets'
    const GET_PROJECT = BASE_URL + '/projet/'
    const IMAGE_PROJECT_DIRECTORY = BASE_URL + '/imagesProjet/'

    useEffect(() => {
        fetch(GET_PROJECTS_ENDPOINT)
            .then((response) => response.json())
            .then((data) => {
                setProjetCardsContent(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const editCard = (cardContent) => {
        const { _id, titre, adresse, description, images, productionAnuelle, type, video } = cardContent;
        router.push({
            pathname: '/projet/modifierProjet',
            query: { _id, titre, adresse, description, images, productionAnuelle, type, video }
        })
    };

    const readCard = (cardContent) => {
        const { _id, titre, adresse, description, images, productionAnuelle, type, video } = cardContent;

        router.push({
            pathname: '/projet/singleProjet',
            query: { _id, titre, adresse, description, images, productionAnuelle, type, video }
        })
    };

    const removeCard = (id) => {
        console.log(id);
        fetch(GET_PROJECT + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`http error, status : ${response.status}`);
                }
                console.log('projet Successfully deleted');
            })
            .catch((error) => console.log(error));
        setProjetCardsContent(projetCardsContent.filter((card) => card._id !== id));
    };


    if (projetCardsContent.length === 0) {
        return <div>loading...</div>;
    }
    return (
        <div className="grid">
            {projetCardsContent.map((cardContent, index) => {
                const json_data = JSON.stringify(cardContent);
                console.log(json_data);

                return (
                    <div key={cardContent._id} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.titre} toggleable>
                            <img src={IMAGE_PROJECT_DIRECTORY + cardContent.images[0]} style={{ height: 215.1, width: 322.5 }} className="w-6" />
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{cardContent.description}</p>
                        </Fieldset>
                        <Button label="Consulter" className="p-button-success m-4" onClick={() => readCard(cardContent)} />
                        <Button label="Modifier" className="m-4" onClick={() => editCard(cardContent)} />
                        <Button label="Supprimer" className="p-button-danger m-4" onClick={() => removeCard(cardContent._id)} />

                    </div>
                );
            })}

        </div>
    );
};

export default withRouter(PanelDemo);
