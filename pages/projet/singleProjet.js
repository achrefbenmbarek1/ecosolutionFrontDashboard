import React from 'react';
import Gallery from '../../demo/components/Gallery';
import getConfig from 'next/config';

const EmptyPage = ({ data }) => {
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const IMAGE_PROJECT_DIRECTORY = BASE_URL + '/imagesProjet/';
    const VIDEO_PROJECT_DIRECTORY = BASE_URL + '/videosProjet/';

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Projet:</h3>
                    <h5>{data.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{data.description}</h5>
                    <h3>Adresse:</h3>
                    <h5>{data.adresse}</h5>
                    <h3>Production Anuelle:</h3>
                    <h5>{data.productionAnuelle}</h5>
                    <h3>type:</h3>
                    <h5>{data.type}</h5>
                    <Gallery
                        imagePaths={Array.isArray(data.images) ?
                            data.images.map((imageName) => IMAGE_PROJECT_DIRECTORY + imageName) :
                            IMAGE_PROJECT_DIRECTORY + data.images}>

                    </Gallery>
                    <video controls>
                        <source src={`${VIDEO_PROJECT_DIRECTORY}${data.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

EmptyPage.getInitialProps = async ({ query }) => {
    const data = query;

    return { data };
};


export default EmptyPage;






