import React from 'react';
import {CustomNav} from './helper'

export const RegionNav = props => {
    return (
        <nav style={props.style}>
            <ul className="tabs vertical">
                <CustomNav to="/eu" title="European Union" label="EU" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/efta" label="EFTA" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/caricom" label="CARICOM" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/pa" label="PA" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/au" label="AU" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/usan" label="USAN" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/eeu" label="EEU" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/al" label="AL" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/asean" label="ASEAN" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/cais" label="CAIS" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/cefta" label="CEFTA" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/nafta" label="NAFTA" generalClassName="tab-title" activeOnlyWhenExact={true} />
                <CustomNav to="/saarc" label="SAARC" generalClassName="tab-title" activeOnlyWhenExact={true} />
            </ul>
        </nav>
    )
}

export const HeadNav = props => {
    return (
        <nav>
            <ul className="heading-nav padding-bottom-medium">
                <CustomNav to={"/"} label="Home" generalClassName="heading-nav-entry" activeOnlyWhenExact={true} />
                <CustomNav to={"/tracking/countries"} label="Tracking" generalClassName="heading-nav-entry" activeOnlyWhenExact={true} />
            </ul>
        </nav>
    )
}