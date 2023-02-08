import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useMediaQuery from "@mui/material/useMediaQuery";
import cx from "classnames";
import Slider from "react-slick";
import "./card-slider.scss";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// const EmptySlider = ({ children }) => (
//   <div className="CardSlider__empty">{children}</div>
// );

const CardSlider = ({ dark, slides = 1, iLn = 0, children }) => {
  let sliderRef = null;

  let slidesToShow = slides;
  if (useMediaQuery("(max-width:1440px)")) slidesToShow -= 1;
  if (useMediaQuery("(max-width:960px)")) slidesToShow -= 1;
  if (useMediaQuery("(max-width:700px)")) slidesToShow -= 1;
  if (useMediaQuery("(max-width:600px)")) slidesToShow = 1;

  const renderSlider = iLn > slidesToShow;
  // const SliderComp = iLn <= slidesToShow ? EmptySlider : Slider;

  const onNextHandler = (sliderRef) => {
    sliderRef.slickNext();
  };
  const onPrevHandler = (sliderRef) => {
    sliderRef.slickPrev();
  };

  return (
    <div
      className={cx("CardSlider", {
        __dark: dark,
      })}
    >
      {renderSlider && (
        <div className="CardSlider__buttons">
          <div onClick={() => onPrevHandler(sliderRef)}>
            <ArrowBackIosNewIcon />
          </div>
          <div onClick={() => onNextHandler(sliderRef)}>
            <ArrowForwardIosIcon />
          </div>
        </div>
      )}

      <Slider
        ref={(ref) => (sliderRef = ref)}
        dots={false}
        arrows={false}
        infinite={renderSlider}
        speed={500}
        row={1}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
      >
        {children}
      </Slider>
    </div>
  );
};

export default CardSlider;
