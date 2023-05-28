import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { useEffect, useRef } from 'react';
import getConfig from 'next/config';


const FormLayoutDemo = () => {
    const ref_id = useRef(0);
    const refPuissanceAllemande = useRef(0);
    const refPuissanceChinoise = useRef(0);
    const [key, setKey] = useState(0);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const GET_PUISSANCE_ENDPOINT = BASE_URL + '/puissance';
    const UPDATE_PUISSANCE_ENDPOINT = BASE_URL + '/puissance/update/';

    useEffect(() => {

        fetch(GET_PUISSANCE_ENDPOINT)
            .then((response) => response.json())
            .then((data) => {
                ref_id.current = data[0]._id
                refPuissanceAllemande.current = data[0].puissanceAllemande;
                refPuissanceChinoise.current = data[0].puissanceChinoise;

                setPuissanceAllemande(data[0].puissanceAllemande)
                setPuissanceChinoise(data[0].puissanceChinoise)

            })
            .catch((error) => console.log(error));
    }, []);
    const [puissanceAllemande, setPuissanceAllemande] = useState('');
    const [puissanceChinoise, setPuissanceChinoise] = useState('');
    const regex = /^\d+(\.\d+)?$/;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = ref_id.current
        const puissance = { puissanceAllemande, puissanceChinoise }
        console.log(puissance);


        try {
            if (regex.test(puissanceAllemande) && regex.test(puissanceChinoise)) {
                const response = await fetch(UPDATE_PUISSANCE_ENDPOINT + _id, {
                    method: 'PUT',
                    body: JSON.stringify(puissance),
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response);
                if (response.ok) {
                    alert("puissance modifié avec succés");
                    refPuissanceAllemande.current = puissanceAllemande;
                    refPuissanceChinoise.current = puissanceChinoise;
                }
            }
            else {
                setPuissanceAllemande(refPuissanceAllemande.current);
                setPuissanceChinoise(refPuissanceChinoise.current);
                setKey(key + 1);
                alert('puissance invalide veuillez saisir un nombre');
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="grid">
            <div className="col-10">
                <div className="card">
                    <h5>Puissances des panneaux</h5>
                    <form key={key} onSubmit={handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-12">
                                <label htmlFor="SiegeSocial">Puissance Allemande</label>
                                <InputText onChange={(e) => setPuissanceAllemande(e.target.value)} id="PuissanceAllemande" name="PuissanceAllemande" type="text" defaultValue={puissanceAllemande} />
                            </div>
                            <div className="field col-12 md:col-12">
                                <label htmlFor="numeroTelephone">Puissance Chinoise</label>
                                <InputText onChange={(e) => setPuissanceChinoise(e.target.value)} id="PuissanceChinoise" name="PuissanceChinoise" type="text" defaultValue={puissanceChinoise} />
                            </div>
                            <Button type="submit" label="Valider" icon="pi pi-check" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;










