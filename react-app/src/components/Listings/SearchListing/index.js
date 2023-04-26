import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ListingSearchResults({listing}) {
const dispatch = useDispatch()
const history = useHistory()
    console.log(listing)
    const handleListingClick = (e) => {
        e.preventDefault()

    }

  const previewImage =  listing.listing_images.filter((e)=> {
        return e.is_display_image === true
    })
    console.log(previewImage)
  return (
    <div onClick={handleListingClick} className="search-result-listing-card-container">
        <img src={previewImage[0].image} className="search-result-listing-image"style={{"height":"25px", "width": "25px"}}/>
        <div className="search-result-listing-name">{listing.name}</div>
    </div>
  );
}

export default ListingSearchResults;
