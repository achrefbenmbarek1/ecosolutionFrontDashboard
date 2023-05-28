import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useRef } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import getConfig from 'next/config';

const FormLayoutDemo = () => {
    const ref_id = useRef(0);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const GET_CONTACTINFO_ENDPOINT = BASE_URL + '/contactInfo';
    const UPDATE_CONTACTINFO_ENDPOINT = BASE_URL + '/contactInfo/update/';

    useEffect(() => {

        fetch(GET_CONTACTINFO_ENDPOINT)
            .then((response) => response.json())
            .then((data) => {
                ref_id.current = data[0]._id

                setSiegeSocial(data[0].siegeSocial)
                setNumeroTelephone(data[0].numeroTelephone)
                setEmail(data[0].email)
                setLocalisation(data[0].localisation)
                setLienFacebook(data[0].lienFacebook)

            })
            .catch((error) => console.log(error));
    }, []);

    const [siegeSocial, setSiegeSocial] = useState('');
    const [numeroTelephone, setNumeroTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [lienFacebook, setLienFacebook] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();

        const _id = ref_id.current
        const contactInfo = { _id, siegeSocial, numeroTelephone, email, localisation, lienFacebook }
        console.log(contactInfo);


        try {

            const response = await fetch(UPDATE_CONTACTINFO_ENDPOINT + _id, {
                method: 'PUT',
                body: JSON.stringify(contactInfo),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(response);

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="grid">
            <div className="col-10">
                <div className="card">
                    <h5>Inforamtion Contact</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="SiegeSocial">Siège social</label>
                                <InputText onChange={(e) => setSiegeSocial(e.target.value)} id="SiegeSocial" name="SiegeSocial" type="text" defaultValue={siegeSocial} />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="numeroTelephone">Numéros de téléphones</label>
                                <InputText onChange={(e) => setNumeroTelephone(e.target.value)} id="numeroTelephone" name="numeroTelephone" type="text" defaultValue={numeroTelephone} />
                            </div>
                            <div className="field col-12 ">
                                <label htmlFor="email">email</label>
                                <InputText onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" defaultValue={email} />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="localisation">Localisation de la société</label>
                                <InputTextarea onChange={(e) => setLocalisation(e.target.value)} id="localisation" name="localisation" type="text" defaultValue={localisation} />
                            </div>
                            <div className="field col-12 ">
                                <label htmlFor="lienFacebook">Lien Facebook</label>
                                <InputText onChange={(e) => setLienFacebook(e.target.value)} id="lienFacebook" name="lienFacebook" type="text" defaultValue={lienFacebook} />
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
