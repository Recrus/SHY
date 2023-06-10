import React from 'react';
import classes from "./Landing.module.css";
import Button from "../../../components/UI/Button/Button";
import goalImg from "../../../media/images/Landing/work_station.jpg";
import RateCards from "../../../components/UI/RateCards/RateCards";
import facebook from "../../../media/icons/Login/facebook.svg";
import instagram from "../../../media/icons/Login/instagram.svg";
import twitter from "../../../media/icons/Login/twitter.svg";
import Accordion from "../../../components/UI/Accordion/Accordion";
import BurgerMenu from "../../../components/UI/BurgerMenu/BurgerMenu";
import Header from "../../../components/UI/Header/Header";
import {useStateContext} from "../../../context/ContextProvider.jsx";

const Landing = () => {
    const items = [
        {
            title: 'Start',
            content: 'Take our exam to prove your knowledge and abilities in your preferred specialization and start your journey.',
        },
        {
            title: 'Interview',
            content: 'After your exam, if you do well, we\'ll show your resume to HR teams that are seeking employment. They will then get in touch with you to talk about your background and skills.',
        },
        {
            title: 'Education',
            content: 'Don\'t worry if you don\'t pass the test the first time! In order to assist you develop your abilities and study for the exam once more, we provide educational courses.',
        },
        {
            title: 'Concluding',
            content: 'After you successfully complete the exam and the interview process, you have already gained employment. The trip is exciting and ends in outstanding work and a wonderful job.',
        },
    ];

    const overviews = [
        {
            author: "Laura",
            content: "I passed the SHY exam and got a job in web development. I adore my new job!",
            occupation: "Font-end developer",
            avatar: "https://i.ibb.co/Gv7ML5Z/Laura.jpg",
            git: "#",
        },
        {
            author: "Sarah",
            content: "With the aid of SHY, I was able to pass the difficult exam and find a rewarding career in data science.",
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
        }
    ];

    const {isMenuOpen, setIsMenuOpen} = useStateContext();

    if (isMenuOpen) {
        document.body.style.overflow = "hidden"
    } else document.body.style.overflow = "visible"

    return (
        <div className={classes.wrapper}>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} linkVisible={true}></Header>
            <div className={classes.mainWrapper}>
                <div className={classes.landingContent}>
                    <div className={classes.landingContent_text}>Find your dream job</div>
                    <Button text={"Learn more"}></Button>
                </div>
            </div>
            <main className={classes.main}>
                <div className={classes.goalContainer}>
                    <div>
                        <hr className={classes.goalLine}/>
                        <div className={classes.goalText}>
                            Ready to start a new career in IT? Our project is the perfect place to begin.
                        </div>
                    </div>
                    <img src={goalImg} alt="" className={classes.goalImg}/>
                </div>
                <div className={classes.table}>
                    <div className={classes.table_text}>
                        It's a simple idea: you look for a job, we find employers who need you.
                    </div>
                    <div className={classes.tableMain}>
                        <Accordion items={items}></Accordion>
                    </div>
                </div>
                <div className={classes.about}>
                    <div className={classes.about_title}>Junior-developer`s about us</div>
                    <div className={classes.about_cardList}>
                        <RateCards overviews={overviews}/>
                    </div>
                </div>
                <div className={classes.questionForm_container}>
                    <div className={classes.questionForm_title}>Any questions?</div>
                    <div className={classes.questionForm_subtitle}>
                        Your desire to fit in with our community is something we respect. If you still have a question,
                        please enter it below along with your email.
                    </div>
                    <div>
                        <form
                            className={classes.questionForm}
                        >
                            <input
                                placeholder="Name"
                                name="name"
                            />
                            <input
                                placeholder="Email"
                                name="email"
                            />
                            <textarea
                                placeholder="Message"
                                name="message"
                            />
                            <button>Send Message</button>
                        </form>
                    </div>
                </div>
            </main>
            <BurgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}></BurgerMenu>
            <footer className={classes.footer_wrapper}>
                <div className={classes.footer_container}>
                    <div className={classes.footer_section}>
                        <div className={classes.footer_title}>
                            <div className={classes.footer_titleMain}>Company info</div>
                            <div className={classes.footer_text}>About us</div>
                            <div className={classes.footer_text}>Contact us</div>
                        </div>
                    </div>
                    <div className={classes.footer_section}>
                        <div className={classes.footer_links}>
                            <a href="Landing#"><img src={facebook} alt="#"/></a>
                            <a href="Landing#"><img src={instagram} alt="#"/></a>
                            <a href="Landing#"><img src={twitter} alt="#"/></a>
                        </div>
                    </div>
                    <div className={classes.footer_section}>
                        <div className={classes.footer_title}>
                            <div className={classes.footer_titleMain}>Features</div>
                            <div className={classes.footer_text}>Courses</div>
                        </div>
                    </div>
                </div>
                <div className={classes.footer_author}>
                    Designed & Developed by Recrus
                </div>
            </footer>
        </div>
    );
};

export default Landing;
