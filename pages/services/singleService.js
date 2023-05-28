import React from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

const EmptyPage = () => {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const IMAGE_SERVICE_DIRECTORY = BASE_URL + '/imageService/'

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Service:</h3>
                    <h5>{router.query.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{router.query.description}</h5>
                    <img src={IMAGE_SERVICE_DIRECTORY + router.query.image} ></img>
                </div>

            </div>
        </div>
    );
};

export default EmptyPage;
