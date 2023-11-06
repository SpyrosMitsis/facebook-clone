import React from 'react';
import './CoverPicture.scss';

interface Props {
    photoUrl: string;
}

export const CoverPicture = ({ photoUrl }: Props): JSX.Element => {
    return (
        <div className="cover-picture">
            <img src={photoUrl} alt="Cover" /> 
        </div>
    );
};
