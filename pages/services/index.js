import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router'
import getConfig from 'next/config';

const PanelDemo = () => {
    const router = useRouter();
    const [serviceCardsContent, setServiceCardsContent] = useState([]);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const GET_SERVICES_ENDPOINT = BASE_URL + '/services';
    const SERVICE_ENDPOINT = BASE_URL + '/service/';
    const IMAGE_SERVICE_DIRECTORY = BASE_URL + '/imageService/';

    useEffect(() => {
        fetch(GET_SERVICES_ENDPOINT)
            .then((response) => response.json())
            .then((data) => {
                setServiceCardsContent(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const editCard = (cardContent) => {
        const { _id, titre, image, description } = cardContent;
        router.push({
            pathname: '/services/modifierService',
            query: { _id, titre, image, description }
        })
    };

    const readCard = (cardContent) => {
        const { _id, titre, image, description } = cardContent;
        console.log("image . current in index", image);
        router.push({
            pathname: '/services/singleService',
            query: { _id, titre, image, description }
        })
    };

    const removeCard = (id) => {
        console.log(id);
        fetch(SERVICE_ENDPOINT + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`http error, status : ${response.status}`);
                }
                console.log('serviceSuccessfully deleted');
            })
            .catch((error) => console.log(error));
        setServiceCardsContent(serviceCardsContent.filter((card) => card._id !== id));
    };


    if (serviceCardsContent.length === 0) {
        return <div>loading...</div>;
    }

    return (
        <div className="grid">
            {serviceCardsContent.map((cardContent, index) => {
                const json_data = JSON.stringify(cardContent);
                console.log(json_data)

                return (
                    <div key={cardContent._id} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.titre} toggleable>
                            <img src={IMAGE_SERVICE_DIRECTORY + cardContent.image} style={{ height: 215.1, width: 322.5 }} className="w-6" />
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









