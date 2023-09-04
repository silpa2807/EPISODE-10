import User from "./User";
import UserClass from "./UserClass";
import { Component, useEffect } from "react";


const About = () => {
    //this is how u clear up interval in functional compoennets
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("set interval functional component");
        }, 1000);

        return ()=>{
            clearInterval(timer);
        }
    }, []);

    return (
        <div>
            <h1>About page</h1>
            <h2>This is namaste react about page</h2>
            <User name={"silpa function"} />
        </div>
    );
};

export default About;
