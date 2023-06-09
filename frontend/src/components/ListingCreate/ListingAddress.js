import React, { useState, useEffect } from "react";
import './ListingCreate.css'
import './ListingAddress.css'
import ListingInfo from "./ListingInfo";
import ListingCreate from ".";
import ListingProgressBar from "./ListingProgressBar";
import Errors from "./Errors";
import { useRef } from "react";

const ListingAddress = ({listing, step, setStep, totalSteps}) => {
    const [address, setAddress] = useState(listing?.address)
    const [city, setCity] = useState(listing?.city)
    const [next, setNext] = useState(false)
    const [back, setBack] = useState(false)
    const [errors, setErrors] = useState('')
    const addressRef = useRef(null)
    const cityRef = useRef(null)
    const errorMsg = 'Fields cannot be blank'

    const handleRef = (input) => {
        const currentInput = input.current

        if(input && !currentInput?.value){
            currentInput.style.border = '2px solid red'
        } else {
            currentInput.style.border = '1px solid black'
        };
    };

    useEffect(()=> {
        if(address && city && errors){
            setErrors('')
        };
    }, [address, city])

    const handleNext = () => {
        if(address && city){
            setStep(step+1)
            setNext(true)
        } else {
            setErrors(errorMsg)
            handleRef(addressRef)
            handleRef(cityRef)
        }
    };

    const handleBack = () => {
        setStep(step-1)
        setBack(true)
    };

    if(next){
        listing = {...listing, address: address, city: city}
        return (
            <ListingInfo 
                listing={listing}
                step={step}
                setStep={setStep}
                totalSteps={totalSteps}
            />
        )
    }

    if(back){
        listing = {...listing, address: address, city: city}
        return (
            <ListingCreate 
                wipListing={listing}
                step={step}
                setStep={setStep}
                totalSteps={totalSteps}
            />
        )
    };

    return (
        <div className='listing-create-page'>
            <div className='listing-address-box'>
                <div className='listing-address-header'>What's the address of your property?</div>
                <div className='listing-address-subheader'>Your address is only shared with guests after they've made a reservation.</div>
                <div className='listing-street-box'>
                    <div>Street Address</div>
                    <input ref={addressRef} id='street-input' type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className='listing-region-box'>
                    <div className='listing-city-box'>
                        <div>City</div>
                        <input id='city-input' ref={cityRef} type="text" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                    <div className='listing-state-box'>
                        <div>State</div>
                        <input id='state-input' type="text" value='CA' readOnly/>
                    </div>
                    <div className='listing-country-box'>
                        <div>Country</div>
                        <input id='country-input' type="text" value='United States' readOnly />
                    </div>
                </div>
                <Errors errors={errors}/>
            </div>
            <ListingProgressBar step={step} totalSteps={totalSteps} handleNext={handleNext} handleBack={handleBack}/>
        </div>
    )
}

export default ListingAddress