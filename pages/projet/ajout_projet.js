import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';

import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import getConfig from 'next/config';

const FormLayoutDemo = () => {

    ///////////////////////////////////////////

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;

        });

        setTotalSize(_totalSize);

        setImages([...images, ...e.files]);

    };




    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        console.log("images in remove ", images)
        console.log("file in remove ", file);
        setImages(images.filter((image) => image !== file));
        //console.log("images in remove after filter ",images)
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    /////////////////////////////////////
    const [titre, setTitre] = useState('');
    const [adresse, setAdresse] = useState('');
    const [description, setDescription] = useState('');
    const [productionAnuelle, setProductionAnuelle] = useState('');
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [type, setType] = useState(null);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const ADD_PROJECT_ENDPOINT = BASE_URL + '/projet/ajouter_projet';

    useEffect(() => { console.log("images use effect", images) }, [images])
    const types = [
        { name: 'Pompage au fil du soleil', code: 'Pompage au fil du soleil' },
        { name: 'Pompage raccordé steg', code: 'Pompage raccordé steg' },
        { name: 'Maison raccordée STEG', code: 'Maison raccordée STEG' },
        { name: 'Maison non raccordée STEG', code: 'Maison non raccordée STEG' }
    ];

    const handleRemove = async (e) => {

        console.log('Files Removed:');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image)

        });

        formData.append('titre', titre);
        formData.append('adresse', adresse);
        formData.append('description', description);
        formData.append('productionAnuelle', productionAnuelle);
        formData.append('type', type?.name);
        formData.append('video', video);
        console.log("houni tab3a total", images, video, titre, adresse, description, productionAnuelle, type);

        try {
            if (images.length !== 0 && titre !== '' && adresse !== '' && description !== '' && productionAnuelle !== '' && type !== null && video !== null) {
                const response = await fetch(ADD_PROJECT_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
                console.log(response);
                router.push('/projet')
            }
        } catch (error) {
            console.log(error);
        }
        console.log(formData);
    };

    const router = useRouter();
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <h5>Ajouter Projet</h5>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="firstname2">Titre</label>
                                <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" />
                            </div>

                            <div className="field col-12">
                                <label htmlFor="address">Address</label>
                                <InputTextarea id="address" name="address" onChange={(e) => setAdresse(e.target.value)} rows="4" />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="description">Description</label>
                                <InputTextarea onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows="4" />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="productionAnuelle">Production anuelle</label>
                                <InputText onChange={(e) => setProductionAnuelle(e.target.value)} id="productionAnuelle" name="productionAnuelle" type="text" />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="type">Type</label>
                                <Dropdown id="type" value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" placeholder="Choisir type du projet"></Dropdown>
                            </div>

                            <div className="field col-12 ">
                                <label >Images</label>
                                <div>
                                    <Toast ref={toast}></Toast>
                                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
                                    <FileUpload ref={fileUploadRef} name="images" multiple accept="image/*" maxFileSize={3000000}
                                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                </div>

                            </div>






                            <div className="field col-12 ">
                                <label htmlFor="state">video</label>
                                <FileUpload name="myFile" className="custom-file-upload"
                                    customUpload onSelect={(e) => {
                                        setVideo(e.files[0])
                                    }}
                                    chooseLabel={video ? video.name : 'Choisir une video'} cancelLabel="Cancel" mode="basic"
                                    accept="video/*" maxFileSize={1000000} />
                            </div>



                        </div>
                        <Button className={styles['my-fileupload']} type="submit" label="Ajouter" icon="pi pi-check" />
                    </form>
                </div>
            </div>
        </div>
    );

};

export default FormLayoutDemo;
