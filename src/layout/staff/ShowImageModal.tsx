import React, {useState} from "react";
import { Modal } from "react-bootstrap";

function ShowImageModal(props: any) {
    const nextImage = () => {
        props.setCurrentIndex((prevIndex : any) => (prevIndex + 1) % props.images.length);
    };

    const previousImage = () => {
        props.setCurrentIndex((prevIndex :any) => (prevIndex - 1 + props.images.length) % props.images.length);
    };
        if (props.images.length === 0) {
            return (
                <div></div>
            )
        } else {
            return (
                <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong className={'text-center'}>Ảnh Sản Phẩm({props.currentIndex + 1}/{props.images.length})</strong>

                        </Modal.Title>
                    </Modal.Header>

                    <div>
                        <Modal.Body>
                            <div className="post-detail-image-item-one">
                                <button className={'previous-image'} title={'Previous'} hidden={props.images.length === 1 || props.currentIndex === 0}
                                        onClick={previousImage} disabled={props.images.length <= 1}>
                                    <svg style={{marginLeft : '5px'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill="#000000">
                                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                                    </svg>

                                </button>
                                <img style={{cursor: 'pointer'}} src={props.images[props.currentIndex].imageLink} alt=""/>
                                <button className={'next-image'}  title={'Next'} hidden={props.images.length === 1 || props.currentIndex === props.images.length - 1}
                                  onClick={nextImage} disabled={props.images.length <= 1}>

                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill="#000000">
                                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                                    </svg>

                                </button>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            )
        }


}

export default ShowImageModal