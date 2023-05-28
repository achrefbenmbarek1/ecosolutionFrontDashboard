import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css'

import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import getConfig from 'next/config';
const FormLayoutDemo = ({ data }) => {
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
        setImage(files[0])

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
        console.log("image in remove ", image)
        console.log("file in remove ", file);
        setImage(undefined);

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
        console.log('mil item template', file);
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name ?? file} role="presentation" src={file.objectURL ?? `http://localhost:5050/imageService/${file}`} width={100} />
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
        console.log('ena fil empty template')
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

    const router = useRouter()
    const [image, setImage] = useState(data.image);
    const [titre, setTitre] = useState(data.titre);
    const [description, setDescription] = useState(data.description);
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const UPDATE_SERVICE_ENDPOINT = BASE_URL + '/service/update/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = data._id;
        console.log("houni", _id)
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('titre', titre);

        try {
            if (description !== '' && titre !== '') {
                const response = await fetch(UPDATE_SERVICE_ENDPOINT + _id,
                    {
                        method: 'PUT',
                        body: formData,
                        credentials: 'include'
                    }
                );
                console.log(response);
                router.push('/services')
            }
        } catch (error) {
            console.log(error);
        }
        console.log(FormData);

    }



    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Modifier Services</h5>
                        <div className="field">
                            <label htmlFor="titre">Nom Service</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" defaultValue={data.titre} />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Description</label>
                            <InputTextarea onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows="4" defaultValue={data.description} />

                        </div>


                        <div className="field col-12 ">
                            <label >Images</label>
                            <div>
                                <Toast ref={toast}></Toast>

                                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                <FileUpload ref={fileUploadRef} name="image" accept="image/*" maxFileSize={3000000}
                                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                            </div>
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Valider" icon="pi pi-check" />

                    </form>
                </div>
            </div>
        </div>
    );
};


FormLayoutDemo.getInitialProps = async ({ query }) => {
    const data = query;
    return { data };
};

export default FormLayoutDemo;
