import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { useEffect, useRef } from 'react';
import getConfig from 'next/config';


const FormIndicateurPage = () => {
    const ref_id = useRef(0);
    const refIndicateurPuissance = useRef(0);
    const refIndicateurCarbone = useRef(0);
    const refIndicateurNombreDeProjet = useRef(0);
    const [key, setKey] = useState(0);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const GET_INDICATEUR_ENDPOINT = BASE_URL + '/indicateur';
    const UPDATE_INDICATEUR_ENDPOINT = BASE_URL + '/indicateur/update/';

    useEffect(() => {

        fetch(GET_INDICATEUR_ENDPOINT)
            .then((response) => response.json())
            .then((data) => {
                ref_id.current = data[0]._id
                refIndicateurPuissance.current = data[0].indicateurPuissance;
                refIndicateurCarbone.current = data[0].indicateurCarbone;
                refIndicateurNombreDeProjet.current = data[0].indicateurNombreDeProjet;

                setIndicateurPuissance(data[0].indicateurPuissance);
                setIndicateurCarbone(data[0].indicateurCarbone);
                setIndicateurNombreDeProjet(data[0].indicateurNombreDeProjet)

            })
            .catch((error) => console.log(error));
    }, []);
    const [indicateurPuissance, setIndicateurPuissance] = useState('');
    const [indicateurCarbone, setIndicateurCarbone] = useState('');
    const [indicateurNombreDeProjet, setIndicateurNombreDeProjet] = useState('');
    const regexFloat = /^\d+(\.\d+)?$/;
    const regexInt = /^\d+$/;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = ref_id.current
        const indicateur = { indicateurPuissance, indicateurCarbone, indicateurNombreDeProjet }
        console.log(indicateur);


        try {
            if (regexFloat.test(indicateurPuissance) && regexFloat.test(indicateurCarbone) && regexInt.test(indicateurNombreDeProjet)) {
                const response = await fetch(UPDATE_INDICATEUR_ENDPOINT + _id, {
                    method: 'PUT',
                    body: JSON.stringify(indicateur),
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response);
                if(response.ok){
                    alert("puissance modifié avec succés");
                    refIndicateurNombreDeProjet.current = indicateurNombreDeProjet;
                    refIndicateurCarbone.current = indicateurCarbone;
                    refIndicateurPuissance.current = indicateurPuissance;
                }
            }
            else {
                setIndicateurPuissance(refIndicateurPuissance.current);
                setIndicateurCarbone(refIndicateurCarbone.current);
                setIndicateurNombreDeProjet(refIndicateurNombreDeProjet.current);
                setKey(key + 1);
                alert('indicateurs invalide veuillez les saisir dans le bon format');
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="grid">
            <div className="col-10">
                <div className="card">
                    <h5>Indicateurs</h5>
                    <form key={key} onSubmit={handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-12">
                                <label htmlFor="SiegeSocial">Indicateur de puissance</label>
                                <InputText onChange={(e) => setIndicateurPuissance(e.target.value)} id="IndicateurPuissance" name="IndicateurPuissance" type="text" defaultValue={indicateurPuissance} />
                            </div>
                            <div className="field col-12 md:col-12">
                                <label htmlFor="numeroTelephone">indicateur de carbone</label>
                                <InputText onChange={(e) => setIndicateurCarbone(e.target.value)} id="IndicateurCarbone" name="IndicateurCarbone" type="text" defaultValue={indicateurCarbone} />
                            </div>
                            <div className="field col-12 md:col-12">
                                <label htmlFor="numeroTelephone">indicateur de nombre de projets</label>
                                <InputText onChange={(e) => setIndicateurNombreDeProjet(e.target.value)} id="IndicateurNombreDeProjet" name="IndicateurNombreDeProjet" type="text" defaultValue={indicateurNombreDeProjet} />
                            </div>
                            <Button type="submit" label="Valider" icon="pi pi-check" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormIndicateurPage;

