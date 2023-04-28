import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getListings, fetchListings } from "../../store/listing"
import ListingIndexItem from "./ListingIndexItem"
import './ListingIndex.css'
import ListingShow from "../ListingShow"

const ListingIndex = () => {
    const dispatch = useDispatch()
    const listings = useSelector(getListings)

    useEffect(()=> {
        dispatch(fetchListings())
    }, [dispatch])

    return (
        <ul id='listing-box-container'>
            {
                listings.map(listing => <ListingIndexItem
                    listing={listing}
                    key={listing.id}
                />)
            }
        </ul>
    )
}

export default ListingIndex;