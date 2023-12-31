import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerUI from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantList";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=10.1446281&lng=76.22727139999999&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();

        setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) {
        return <h1>You are offline</h1>;
    }

    return ListOfRestaurants && ListOfRestaurants.length === 0 ? (
        <ShimmerUI />
    ) : (
        <div className="body">
            <div className="flex items-center">
                <div className="m-4 p-4">
                    <input
                        type="text"
                        className="border border-solid border-black"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        className="px-4 py-2 bg-green-200 m-4 rounded-lg"
                        onClick={() => {
                            const filteredRestaurants = ListOfRestaurants.filter((res) =>
                                res.data.name.toLowerCase().includes(searchText.toLowerCase())
                            );

                            setFilteredRestaurants(filteredRestaurants);
                        }}
                    >
                        Search
                    </button>
                </div>
                <div className="p-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                        onClick={() => {
                            const filteredList = ListOfRestaurants.filter(
                                (restaurant) => restaurant.data.avgRating > 4
                            );
                            setFilteredRestaurants(filteredList);
                        }}
                    >
                        Top Rated Restaurant
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-start">
                {filteredRestaurants &&
                    filteredRestaurants.map((restaurant) => (
                        <Link key={restaurant.data.id} to={`/restaurants/${restaurant.data.id}`}>
                            <RestaurantCard key={restaurant.data.id} resData={restaurant} />
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Body;
