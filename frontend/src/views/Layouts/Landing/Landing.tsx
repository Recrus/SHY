import React from "react";
import classes from "./Landing.module.css";
import TheButton from "../../../components/UI/TheButton/TheButton";
import goalImg from "../../../media/images/Landing/work_station.jpg";
import RateCards from "../../../components/UI/RateCards/RateCards";
import facebook from "../../../media/icons/Login/facebook.svg";
import instagram from "../../../media/icons/Login/instagram.svg";
import twitter from "../../../media/icons/Login/twitter.svg";
import BurgerMenu from "../../../components/UI/BurgerMenu/BurgerMenu";
import Header from "../../../components/UI/Header/Header";

import { useStateContext } from "../../../context/StateContext";
import TheTimeline from "../../../components/UI/TheTimeLine/TheTimeLine";
import DarkModeSwitcher from "../../../components/UI/DarkModeSwitcher/DarkModeSwitcher";
import { Item, Overview } from "../../../../types/types";

const Landing = () => {
    //todo database query
    const items: Item[] = [
        {
            title: "Start",
            content:
                "Take our exam to prove your knowledge and abilities in your preferred specialization and start your journey.",
        },
        {
            title: "Interview",
            content:
                "After your exam, if you do well, we'll show your resume to HR teams that are seeking employment. They will then get in touch with you to talk about your background and skills.",
        },
        {
            title: "Education",
            content:
                "Don't worry if you don't pass the test the first time! In order to assist you develop your abilities and study for the exam once more, we provide educational courses.",
        },
        {
            title: "Concluding",
            content:
                "After you successfully complete the exam and the interview process, you have already gained employment. The trip is exciting and ends in outstanding work and a wonderful job.",
        },
    ];

    const overviews: Overview[] = [
        {
            author: "Laura",
            content:
                "I passed the SHY exam and got a job in web development. I adore my new job!",
            occupation: "Front-end developer",
            avatar: "https://i.ibb.co/Gv7ML5Z/Laura.jpg",
            git: "#",
        },
        {
            author: "Sarah",
            content:
                "With the aid of SHY, I was able to pass the difficult exam and find a rewarding career in data science.",
            occupation: "Data scientist",
            avatar: "https://i.ibb.co/T4hx5cD/Sarah.jpg",
            git: "#",
        },
        {
            author: "John",
            content: "Passed the test, hired as a full-stack. Regards, SHY!",
            occupation: "Full-stack developer",
            avatar: "https://i.ibb.co/cc50LVn/John.jpg",
            git: "#",
        },
    ];

    const { isMenuOpen, setIsMenuOpen } = useStateContext();

    if (isMenuOpen) {
        document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "visible";

    return (
        <div className="dark:bg-dark-purple ease-in-out duration-300">
            <Header
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                linkVisible={true}
            ></Header>
            <div
                className={
                    classes.mainWrapper +
                    " dark:bg-purple ease-in-out duration-300"
                }
            >
                <div className={classes.landingContent}>
                    <div className={classes.landingContent_text}>
                        Find your dream job
                    </div>
                    <TheButton text={"Learn more"}></TheButton>
                </div>
            </div>
            <main className={classes.main}>
                <div className={classes.goalContainer}>
                    <div>
                        <hr className={classes.goalLine + " dark:bg-primary"} />
                        <div className={classes.goalText}>
                            Ready to start a new career in IT? Our project is
                            the perfect place to begin.
                        </div>
                    </div>
                    <img
                        src={goalImg}
                        alt=""
                        className={classes.goalImg + " drop-shadow-md"}
                    />
                </div>
                <div className={classes.table}>
                    <div
                        className={classes.table_text + " dark:border-neutral"}
                    >
                        It&apos;s a simple idea: you look for a job, we find
                        employers who need you.
                    </div>
                    <div className="pt-10 flex-center">
                        <TheTimeline props={items} />
                    </div>
                </div>
                <div className={classes.about}>
                    <div className={classes.about_title}>
                        Junior-developer`s about us
                    </div>
                    <div className={classes.about_cardList}>
                        <RateCards overviews={overviews} />
                    </div>
                </div>
                <div className={classes.questionForm_container}>
                    <div className={classes.questionForm_title}>
                        Any questions?
                    </div>
                    <div className={classes.questionForm_subtitle}>
                        Your desire to fit in with our community is something we
                        respect. If you still have a question, please enter it
                        below along with your email.
                    </div>
                    <div>
                        <form className={classes.questionForm}>
                            <input placeholder="Name" name="name" />
                            <input placeholder="Email" name="email" />
                            <textarea placeholder="Message" name="message" />
                            <button className="drop-shadow-md dark:bg-primary ease-in-out duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <BurgerMenu
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
            ></BurgerMenu>
            <footer
                className={
                    classes.footer_wrapper +
                    " dark:bg-purple ease-in-out duration-300"
                }
            >
                <div className={classes.footer_container}>
                    <div className={classes.footer_section}>
                        <div className={classes.footer_title}>
                            <div className={classes.footer_titleMain}>
                                Company info
                            </div>
                            <div className={classes.footer_text}>About us</div>
                            <div className={classes.footer_text}>
                                Contact us
                            </div>
                        </div>
                    </div>
                    <div className={classes.footer_section}>
                        <div className={classes.footer_links}>
                            <a href="#">
                                <img src={facebook} alt="#" />
                            </a>
                            <a href="#">
                                <img src={instagram} alt="#" />
                            </a>
                            <a href="#">
                                <img src={twitter} alt="#" />
                            </a>
                        </div>
                    </div>
                    <div className={classes.footer_section}>
                        <div className={classes.footer_title}>
                            <div className={classes.footer_titleMain}>
                                Features
                            </div>
                            <div className={classes.footer_text}>Courses</div>
                        </div>
                    </div>
                </div>
                <div className={classes.footer_author}>
                    Designed & Developed by Recrus
                </div>
            </footer>
            <div className="fixed bottom-6 right-6 max-w-[35px] rounded-full ease-in-out duration-300">
                <DarkModeSwitcher sunColor="goldenrod" />
            </div>
        </div>
    );
};

export default Landing;
