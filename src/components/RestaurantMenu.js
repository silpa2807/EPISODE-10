import React from "react";
import { useEffect, useState } from "react";
import ShimmerUI from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const { resId } = useParams();

    //customHook
    const resInfo = useRestaurantMenu(resId);

    //resInfo is null so return shimmer ui
    if (resInfo === null) {
        return <ShimmerUI />;
    }

    //check the api response in the preview of network tab
    //card[0] has restaurant info
    const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
        resInfo?.cards[0]?.card?.card?.info;

    //cards[2] conatins all other info
    const { itemCards } =
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>
                {cuisines.join(", ")} {costForTwoMessage}
            </p>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name} - Rs{" "}
                        {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;
