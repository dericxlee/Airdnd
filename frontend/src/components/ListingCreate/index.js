import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './ListingCreate.css'
import ListingAddress from "./ListingAddress"
import ListingProgressBar from "./ListingProgressBar"
import { getListing, fetchListing } from "../../store/listing"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"

const ListingCreate = ({wipListing}) => {
    const [propertyType, setPropertyType] = useState(wipListing?.propertyType || 'Entire home')
    const sessionUser = useSelector(state => state.session.user)
    const [next, setNext] = useState(false)
    const [step, setStep] = useState(1)
    const dispatch = useDispatch()
    const totalSteps = 6
    const {listingId} = useParams()
    const existingListing = useSelector(getListing(listingId))

    
    useEffect(()=> {
        if(listingId){
            dispatch(fetchListing(listingId))
        }
    }, [dispatch, listingId])
    
    if(!sessionUser){
        return (
            <Redirect to='/'/>
        );
    } else if (existingListing && existingListing.hostId !== sessionUser.id){
        return (
            <Redirect to='/client'/>
        );
    };


    let listing = {
        title: '', 
        description: '',
        propertyType: '',
        address: '',
        city: '',
        price: 300,
        maxGuests: 1,
        numBeds: 1,
        numBaths: 1,
        numBedrooms: 1,
        hostId: sessionUser.id
    };

    if(wipListing) {
        listing = wipListing
    } else if (existingListing && !wipListing){
        listing = existingListing
    };
    
    const handleNext = () => {
        if(propertyType) {
            setStep(step+1)
            setNext(true)
        };
    };

    const handleChange = (e) => {
        setPropertyType(e.target.value)
    };
    
    if(next){
        listing = {...listing, propertyType: propertyType}

        return (
            <ListingAddress 
                listing={listing} 
                step={step}
                setStep={setStep} 
                totalSteps={totalSteps} 
            />
        )
    };

    return (
        <div className='listing-create-page'>
            <div className='listing-radio-container'>
                <div className='listing-radio-header'>What type of place will guests have?</div>
                <div className='listing-radio-box'>
                    <input 
                        type="radio"
                        id='entire-home'
                        name='property'
                        value='Entire home'
                        onChange={handleChange}
                        checked={propertyType === 'Entire home'} 
                    />
                    <label for='entire-home'>
                        <div className='radio-label-box'>
                            <p className='radio-header'>An entire place</p>
                            <p className='radio-subheader'>Guest have the whole place to themselves.</p>
                        </div>
                        <div className='radio-img'>
                            <img src="https://cdn-icons-png.flaticon.com/512/6676/6676508.png" alt="" />
                        </div>
                    </label>
                
                    <input 
                        type="radio" 
                        id='private-room'
                        name='property'
                        value='Private room'
                        onChange={handleChange}
                        checked={propertyType === 'Private room'}
                    />
                    <label for='private-room'>
                        <div className='radio-label-box'>
                            <p className='radio-header'>A room</p>
                            <p className='radio-subheader'>Guests have their own room in a home, plus access to shared spaces.</p>
                        </div>
                        <div className='radio-img'>
                            <img src="https://cdn-icons-png.flaticon.com/512/2237/2237440.png" alt="" />
                        </div>
                    </label>
                
                    <input 
                        type="radio" 
                        id='luxury-stay'
                        name='property'
                        value='Luxury stay'
                        onChange={handleChange}
                        checked={propertyType === 'Luxury stay'}
                    />
                    <label for='luxury-stay'>
                        <div className='radio-label-box'>
                            <p className='radio-header'>A complete estate</p>
                            <p className='radio-subheader'>Guests have a whole luxury estate to explore.</p>
                        </div>
                        <div className='radio-img'>
                            <img src="https://cdn-icons-png.flaticon.com/512/341/341585.png" alt="" />
                        </div>
                    </label>
                
                </div>
            </div>
            <ListingProgressBar step={step} totalSteps={totalSteps} handleNext={handleNext}/>
        </div>
    )
}

export default ListingCreate;