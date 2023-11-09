import Button from '@mui/material/Button';
import React, { SyntheticEvent, useRef, useState } from 'react'
import closeIcon from "../../assets/close-icon.png"
import './ImageUplaoder.scss'
import axios from '../../api/axios';
import Cropper, { Area, Point } from 'react-easy-crop';
import { generateDownload, uploadCroppedImage } from '../CropImage/CropImage';
import { generatePath } from 'react-router';
import { useAuthUser } from "react-auth-kit";

type Props = {
    show: boolean,
    imageUrl: string
    setShow: (show: boolean) => void,
    destinationFolder: string,
    aspectRatio: number
}

interface AreaProp {
  width: number;
  height: number;
  x: number;
  y: number;
}


const ImageUploader = (props: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const triggerFileSelectPopup = () => inputRef.current?.click();
    const currentUser = useAuthUser();
    


    const [image, setImage] = React.useState('');
    const [croppedArea, setCroppedArea] = React.useState<AreaProp | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1)

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, croppedAreaPixels);
        setCroppedArea(croppedAreaPixels)
    };
    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>): void => {

        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                // The result is of type string | ArrayBuffer, but we expect a string
                // for setImage. A runtime check is needed to ensure type correctness.
                const result = reader.result;
                if (typeof result === 'string') {
                    setImage(result);
                }
            };
        }
    };

    	const onDownload = () => {
		console.log(generateDownload(image, croppedArea));
	};

    	const onUpload= () => {
		uploadCroppedImage(currentUser()?.id, props.destinationFolder , image, croppedArea);
	};

    return (
        <div style={{
            display: props.show ? "flex" : "none"
        }}>
            <div className="overlay-uploadImage"></div>
            <div className="uploadImage">
                <div className="uploadImage-container">
                    <div className="uploadImage-header">
                        <div>
                            <h1>Upload Image</h1>
                        </div>
                        <img src={closeIcon} alt="close icon" id="close-icon"
                            onClick={() => props.setShow(false)}

                        />
                    </div>

                    <div className="uploadImage-seperator"></div>

                    <form onSubmit={() => null}>
                        <div className="uploadImage-fields">
                            <div className="uploadImage-inputs">
                                {image ? (
                                    <>
                                        <div className='cropper'>
                                            <Cropper
                                                image={image}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={props.aspectRatio}
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={onCropComplete}
                                            />
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                            <input
                                type='file'
                                accept='image/*'
                                ref={inputRef}
                                onChange={onSelectFile}
                                style={{ display: "none" }}
                            />
                            <Button variant='outlined' className='selectImage-btn' onClick={triggerFileSelectPopup}>
                                Select Picture
                            </Button>
                            <Button variant='outlined' className='uploadImage-btn' onClick={onUpload}>
                                Upload Picture
                            </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImageUploader