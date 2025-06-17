export const getSlides = (t: (key: string) => string) => [
    {
        img: "/backgrounds/pexels-max-fischer-5212700.jpg",
        text: t("heroSlideText1"),
        paragraph: t("heroSlideParagraph1")
    },
    {
        img: "/backgrounds/pexels-pixabay-256395.jpg",
        text: t("heroSlideText2"),
        paragraph: t("heroSlideParagraph2")
    },
    {
        img: "/backgrounds/pexels-tima-miroshnichenko-9572726.jpg",
        text: t("heroSlideText3"),
        paragraph: t("heroSlideParagraph3")
    },
]

export const getNavbarData = (t: (key: string) => string) => [
    { slug: "/", text: t("navbarHome") },
    { slug: "/about", text: t("navbarAbout") },
    { slug: "/resources", text: t("navbarResources") },
    { slug: "/favorites", text: t("navbarFavorites") },
]