import React from 'react';
import Gallery from '../../demo/components/Gallery';
import getConfig from 'next/config';

const EmptyPage = ({data}) => {
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const IMAGES_ARTICLE_DIRECTORY = BASE_URL + '/imagesArticle/';
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Article:</h3>
                    <h5>{data.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{data.description}</h5>
                    <h3>Contenu:</h3>
                    <h5>{data.contenu}</h5>
                    <Gallery
                        imagePaths={Array.isArray(data.images) ?
                            data.images.map((imageName) => IMAGES_ARTICLE_DIRECTORY + imageName):
                            IMAGES_ARTICLE_DIRECTORY + data.images}>

                    </Gallery>

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






