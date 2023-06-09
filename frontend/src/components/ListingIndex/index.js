import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { getListings, fetchListings } from "../../store/listing"
import ListingIndexItem from "./ListingIndexItem"
import './ListingIndex.css'

const ListingIndex = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user)
    const listings = useSelector(getListings)

    const params = new URLSearchParams(location.search)
    const city = params.get('city')
    const guests = params.get('guests')

    useEffect(()=> {
        dispatch(fetchListings(city, guests))
    }, [sessionUser, city, guests])

    if(!listings.length){
        return (
            <div id='listing-box-container'>
                <div className='empty-listing-index'>
                    No listings found!
                </div>
            </div>
        );
    };

    return (
        <div id='listing-box-container'>
            {
                listings.map(listing => <ListingIndexItem
                    listing={listing}
                    key={listing.id}
                />)
            }
        </div>
    )
}

export default ListingIndex;