import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element, Link } from "react-scroll";
import Carousel from "../../components/Carousel/Carousel";
import Filter from "../../components/Filter/Filter";
import PageLoader from "../../components/PageLoader/PageLoader";
import TabList from "../../components/TabList/TabList";
import Theater from "../../components/Theater/Theater";
import { setMovieInfo, setMovies } from "../../redux/actions/movieActions";
import WithHeaderAndFooter from "../WithHeaderAndFooter/WithHeaderAndFooter";

const HomePage = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movie.movieList);
  const movieInfo = useSelector((state) => state.movie.movieInfo);
  // const missingInfo = useSelector((state) => state.movie.missingInfo);
  const imageCarouselSettings = {
    autoplay: true,
    dots: true,
    infinite: true,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const movieCarouselSettings = {
    autoplay: false,
    dots: false,
    infinite: true,
    rows: 2,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };
  const tabList = ["ĐANG CHIẾU", "SẮP CHIẾU"];
  const tabPanel1 = (
    <Carousel
      data={movieInfo.isShowingList}
      slideType="movie"
      settings={movieCarouselSettings}
    />
  );
  const tabPanel2 = (
    <Carousel
      data={movieInfo.willBeShownList}
      slideType="movie"
      settings={movieCarouselSettings}
    />
  );
  const tabPanelList = [tabPanel1, tabPanel2];

  React.useEffect(() => {
    dispatch(setMovies());
  }, [dispatch]);

  React.useEffect(() => {
    const sectionId = sessionStorage.getItem("sectionId");
    const link = document.getElementById(sectionId + "Link");
    link &&
      setTimeout(() => link.click(), 800) &&
      setTimeout(() => {
        sessionStorage.removeItem("sectionId");
      }, 2000);
  });

  React.useEffect(() => {
    movieList &&
      movieList.forEach((movie) => {
        dispatch(setMovieInfo(movie.maPhim));
      });
  }, [movieList, dispatch]);

  return (
    <>
      <PageLoader stopCondition={movieList.length} />
      <WithHeaderAndFooter>
        <Carousel
          data={movieList.filter((movie, index) => index >= 5 && index <= 10)}
          slideType="img"
          settings={imageCarouselSettings}
        />
        <Element name="filter">
          <Filter />
        </Element>
        <Element name="lichChieu">
          <TabList
            tabList={tabList}
            tabPanelList={tabPanelList}
            sectionId="lichChieu"
          />
        </Element>
        <Element name="cumRap">
          <Theater sectionId="cumRap" />
        </Element>
        {/* These Link is imported from "react-scroll" and were auto-clicked when redirecting to HomePage, see what 2nd useEffect does*/}
        <Link to="filter" id="filterLink" offset={-64} smooth duration={500} />
        <Link
          to="lichChieu"
          id="lichChieuLink"
          offset={-74.4}
          smooth
          duration={500}
        />
        <Link to="cumRap" id="cumRapLink" offset={-64} smooth duration={500} />
      </WithHeaderAndFooter>
    </>
  );
};

export default HomePage;
