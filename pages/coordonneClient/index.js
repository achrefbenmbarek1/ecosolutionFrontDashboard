import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import getConfig from 'next/config';

export default function BasicFilterDemo() {
    const { publicRuntimeConfig } = getConfig();
    const { BASE_URL } = publicRuntimeConfig;
    const GET_CORDONNE_CLIENTS_ENDPOINT = BASE_URL + '/coordonneClient';
    const [contactsInfo, setContactsInfo] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        prenom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        numeroTelephone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        age: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        fonction: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        localisation: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    useEffect(() => {
        fetch(GET_CORDONNE_CLIENTS_ENDPOINT).then((response) =>
            response.json()).then((data) => {
                console.log(data);
                setContactsInfo(data);
                setLoading(false);
            })
    }, []);


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const clearFilter1 = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            nom: { value: null, matchMode: FilterMatchMode.CONTAINS },
            prenom: { value: null, matchMode: FilterMatchMode.CONTAINS },
            numeroTelephone: { value: null, matchMode: FilterMatchMode.CONTAINS },
            age: { value: null, matchMode: FilterMatchMode.CONTAINS },
            email: { value: null, matchMode: FilterMatchMode.CONTAINS },
            fonction: { value: null, matchMode: FilterMatchMode.CONTAINS },
            localisation: { value: null, matchMode: FilterMatchMode.CONTAINS }
        })
        setGlobalFilterValue('');
    };


    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };





    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={contactsInfo} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                globalFilterFields={['nom', 'prenom', 'numeroTelephone', 'age', 'email', 'fonction', 'localisation']} header={header} emptyMessage="No customers found.">
                <Column field="nom" header="nom" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} showFilterMenu={false} />
                <Column field="prenom" header="prenom" filterField="prenom" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by country" showFilterMenu={false} />
                <Column field="numeroTelephone" header="numeroTelephone" filterField="numeroTelephone" filterPlaceholder="Search by name" style={{ minWidth: '12rem' }}
                    filter showFilterMenu={false} />
                <Column field="age" header="age" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by age" showFilterMenu={false} />
                <Column field="email" header="email" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by age" showFilterMenu={false} />
                <Column field="fonction" header="fonction" filter filterPlaceholder="Search by fonction" style={{ minWidth: '12rem' }} showFilterMenu={false} />
                <Column field="localisation" header="localisation" filter filterPlaceholder="Search by localisation" style={{ minWidth: '12rem' }} showFilterMenu={false} />
            </DataTable>
        </div>
    );
}
