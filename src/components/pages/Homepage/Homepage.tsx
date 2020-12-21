import React, { useState } from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate';
import Button from '../../atoms/Button/Button';
import { MapContainer, TileLayer, Marker, Popup, Circle, MapConsumer } from 'react-leaflet';
import { unidades as poles } from '../../../data/postes.json';
import './styles.css';
import Modal from '../../organisms/Modal/Modal';
import TextField from '../../atoms/TextField/TextField';
import Geocode from "react-geocode";
import { calcDistance } from '../../../helpers/helpers';
import GEOCODE_KEY from '../../../constants';

Geocode.setApiKey(GEOCODE_KEY);

interface LatLong {
    lat: number;
    lng: number;
    alt?: number;
}

interface Pole {
    codigo: string;
    latitude: string;
    longitude: string;
    cidade: string;
    estado: string;
}

//default to Florianopolis
const defaultCenter: LatLong = {
    lat: -27.593500,
    lng: -48.558540
}

const Homepage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [availablePoints, setAvailablePoints] = useState<Pole[]>([]);
    const [center, setCenter] = useState<LatLong>(defaultCenter);
    const [message, setMessage] = useState<string | undefined>(undefined);

    const [street, setStreet] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [cep, setCep] = useState<string>('');

    const handleModalConfirm = async () => {
        Geocode.fromAddress(`${number} ${street} ${city} ${state} ${cep}`).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                // eslint-disable-next-line
                const newAvailablePoints = poles.filter(pole => {
                    const distance = calcDistance(Number(pole.latitude), Number(pole.longitude), lat, lng, 'K');
                    if (distance <= 0.150) return pole;
                });

                if (newAvailablePoints.length) setMessage('Your location can receive our services!')
                else setMessage('Your location cannot receive our services, sorry!')

                setCenter({ lat, lng });
                setAvailablePoints(newAvailablePoints);
            },
            error => {
                console.error(error);
            }
        );
    }

    return (
        <DefaultTemplate>

            <div className="header">
                <Button type="button" onClick={() => setIsModalOpen(true)}>Add address</Button>
                <p>{message && message}</p>
            </div>

            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {poles.map(pole => {
                    const position: LatLong = {
                        lat: Number(pole.latitude),
                        lng: Number(pole.longitude)
                    }

                    return (
                        <>
                            <Marker key={pole.codigo} position={position} >
                                <Popup>
                                    <p>City: {pole.cidade} - {pole.estado}</p>
                                    <p>Code: {pole.codigo}</p>
                                </Popup>
                            </Marker>
                            <Circle center={position} radius={150} />
                        </>
                    )
                })}
                {availablePoints.length > 0 && (
                    <>
                        <MapConsumer>
                            {(map) => {
                                map.flyTo(center);

                                //setTimeout to solve bug that was causing the map to just zoom
                                setTimeout(() => {
                                    map.setZoom(16);
                                }, 1500)
                                return (
                                    <Circle center={center} radius={10} color={'red'}>
                                        <Popup>
                                            <p>This is the location you selected!</p>
                                        </Popup>
                                    </Circle>
                                )
                            }}
                        </MapConsumer>
                    </>
                )}
            </MapContainer>

            <Modal
                handleClose={() => setIsModalOpen(false)}
                handleConfirm={() => {
                    handleModalConfirm();
                    setIsModalOpen(false);
                }}
                isOpen={isModalOpen}
            >
                <div>
                    Add your address details and click in confirm to verify if your locality can receive our services ;)
                </div>
                <div className="modalFields">
                    <TextField type="text" name='Street' id='street' setValue={setStreet} />
                    <TextField type="text" name='Number' id='place-number' setValue={setNumber} />
                    <TextField type="text" name='City' id='city' setValue={setCity} />
                    <TextField type="text" name='State' id='state' setValue={setState} />
                    <TextField type="text" name='CEP' id='cep' setValue={setCep} />
                </div>
            </Modal>
        </DefaultTemplate>
    )
}

export default Homepage;