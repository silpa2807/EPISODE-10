import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
    const { resData } = props;

    const { name, cuisines, cloudinaryImageId, avgRating, costForTwo, deliveryTime } =
        resData?.data;
    return (
        <div className="m-4 p-4 w-[340px] bg-gray-100 rounded-lg hover:bg-gray-200">
            <img className="rounded-lg" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
            <h3 className="font-bold py-2 text-xl">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>₹{costForTwo / 100} for two</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    );
};

export default RestaurantCard;
