import React, { useState } from "react";
import FullPageLoader from '../FullPageLoader';
import {  CCol, CRow} from '@coreui/react';
const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false);

    return [
        loading ? 
        <CRow>
            <CCol className="align-self-start">
                <FullPageLoader />
            </CCol>
        </CRow>: null,
        () => setLoading(true), //Show loader
        () => setLoading(false) //Hide Loader
    ];
};

export default useFullPageLoader;
