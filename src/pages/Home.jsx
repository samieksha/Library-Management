import { useContext, useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { getLoggedInUser } from "../api/userService";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const { loggedUser } = useContext(UserContext);

    return (
        <main>
            <div>
            <section className="section-hero">
                <div className="container grid grid-two--cols">
                    <div className="container ">
                        <p className="hero-subheading">
                        Discover Instantly | Borrow Fast | Reserve Copies | Return Easily
                        </p>
                        <br/>
                        <div className="hero-heading">
                        <h1 className="hero-heading">
                            {loggedUser ? "Welcome back, explore your next read!" : "Where stories are cataloged, and knowledge is just a search away"}
                            </h1>
                        </div>
                        <p className="hero-para">
                        <br/>Find, borrow, reserve, and return. All in seconds, all with a tap.
                        </p>
                        <div className="hero-btn">
                        {!loggedUser ? (<NavLink to="LoginSignup" className="btn">Login In</NavLink>) :
                        (<NavLink to="browse" className="btn">Explore</NavLink>)
                        }
                        </div>
                    </div>
                    <div className="section-hero-image">
                        <img
                            src="heroSection.svg"
                            alt="hero section poster"
                            width="220"
                            height="100%"
                        />
                    </div>
                </div>
      </section>
      </div>
    </main>
    )
}

export default Home;


