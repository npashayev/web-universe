import atom from "@/assets/atom.png"
import CardNav from "../react-bits/card-nav/CardNav";

const items = [
    {
        label: "Home",
        bgColor: "#f9f9f9",
        textColor: "black",
        links: [
            {
                label: "Home", ariaLabel: "HTML roadmap", href: "/",
            }
        ]
    },
    {
        label: "Roadmap",
        bgColor: "#f9f9f9",
        textColor: "black",
        links: [
            {
                label: "HTML", ariaLabel: "HTML roadmap", href: "/roadmap",
            },
            {
                label: "Details", ariaLabel: "Planet details", href: "/details",
            }
        ]
    },
];


const Navbar = () => {
    return (
        <CardNav
            logo={atom}
            logoAlt="atom"
            items={items}
            baseColor="#222222"
            menuColor="#fff"
            buttonBgColor="#f5f5f5"
            buttonTextColor="#000"
            ease="power3.out"
        />
    );
};

export default Navbar;