import Styles from "./Main.module.css";
import { AiFillStar, AiOutlineStar, AiFillHeart } from "react-icons/ai";
import * as React from "react";
import { animated, useSpring, useTransition } from "react-spring";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  InputAdornment,
  FormControl,
  FormLabel,
  OutlinedInput,
  IconButton,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import jwt_decode from "jwt-decode"
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { createComment } from "/public/store/ProductState";

export default function ProductDetail({ product, comment_block }) {
  const [point, setPoint] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const product_description = useSpring({
    height: open ? 220 : 0,
  });

  const RatioOfRatingPoint = (point) => {
    if (point)
      return (
        (point / FilterRatingPoint()?.reduce((sum, i) => sum + i, 0)) * 100
      );
    else return 0;
  };
  const AvgRatingPoint = () => {
    return (
      FilterRatingPoint()?.reduce((sum, i, index) => {
        return sum + i * (index + 1);
      }, 0) / FilterRatingPoint()?.reduce((sum, i) => sum + i, 0)
    ) || 0;
  };

  const FilterRatingPoint = () => {
    let rating = [0, 0, 0, 0, 0]
    comment_block?.map((block) => {
      rating[block.comment.properties.rating_point - 1] += 1;
    })
    return rating
  }

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleSetRatingPoint = (ev) => {
    setPoint(ev.target.value);
  };

  const handlesetComment = (ev) => {
    setComment(ev.target.value);
  };

  const getValue = () => {
    return window.localStorage?.getItem('login-user') == "" ? null : jwt_decode(window.localStorage?.getItem('login-user'))
  }

  const handleClickSubmit = () => {
    createComment({
      rating_point: point * 1,
      content: comment,
      time: new Date()
    }, getValue().username, product?.product_id);
  };

  return (
    <div className="products-container">
      <div
        className={`flex flex-col bg-white container:flex-row items-center container:items-start ${Styles["product-detail"]}`}
      >
        <button
          className={`px-3 pt-4 ${Styles["product-main-image-button"]} product_image flex items-end group`}
          onClick={() => handleClick()}
        >
          <p className="absolute">Ấn vào hình ảnh để xem chi tiết sản phẩm</p>
          <img className={Styles["product-main-image"]} src={product?.imgSrc} />
        </button>
        <div
          className={`${Styles["fix-height"]} container:w-6/12 w-10/12 flex flex-col justify-evenly gap-4 p-4`}
        >
          <small className="font-thin text-gray-600">Đồ gia dụng</small>
          <h1 className="text-4xl text-bold">{product?.title}</h1>
          <div className="text-yellow-500 text-xl flex justify-between">
            <div className="rating flex mr-6 self-center">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>

            <strong className="views">
              {product?.views} <b className="text-yellow-400">Lượt xem</b>
            </strong>
          </div>
          <div className="prices">
            <span className="price text-red-4pd_id00 text-3xl">
              {product?.price}
            </span>
            {open ? "" : <br />}
            <span className="old-price text-black-400 line-through">
              {product?.price}
            </span>
          </div>

          <div>
            <small>Mã sản phẩm: {product?.product_id}</small>
          </div>

          <div className="group-button flex gap-x-4 font-bold">
            <button className="rounded-lg bg-blue-500 text-lg text-white p-3">
              Mua
            </button>
            <button className="rounded-lg bg-blue-500 text-lg text-white p-3">
              Thêm vào giỏ hàng
            </button>

            <button className="p-2 text-blue-500">
              <AiFillHeart className="text-2xl" />
            </button>
          </div>
          <animated.div
            style={product_description}
            className={`text-ellipsis overflow-hidden w-fit rounded-lg bg-white ${Styles["product-description"]} px-3`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ipsum purus, Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam ipsum purus, Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam ipsum purus, Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam ipsum purus, Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nullam ipsum purus, Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
            purus, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam ipsum purus, Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam ipsum purus, Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam ipsum purus, Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nullam ipsum purus, Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
            purus, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam ipsum purus, Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam ipsum purus, Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam ipsum purus,
          </animated.div>
        </div>
      </div>


      <Box
        sx={{
          width: "100%",

          padding: "10px",
        }}
        className="bg-gradient-to-r from-blur-blue to-blur-green border border-4 border-black rounded-lg"
      >
        <h1 className="text-3xl font-bold">Đánh giá và bình luận</h1>
        <FormControl sx={{ padding: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Hãy để lại bình luận dưới đây
          </InputLabel>
          <OutlinedInput
            id="standard-multiline-static"
            label="Hãy để lại bình luận dưới đây"
            multiline
            rows={4}
            defaultValue=""
            variant="standard"
            className="w-full"
            onChange={(ev) => handlesetComment(ev)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  {open ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <div className="review flex md:flex-row flex-col justify-around items-center px-12">
          <FormControl className="text-xs container:text-xl">
            <FormLabel id="demo-radio-buttons-group-label">Đánh giá</FormLabel>
            <RadioGroup
              onChange={(ev) => handleSetRatingPoint(ev)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="5"
              name="radio-buttons-group"
            >
              <div className="text-yellow-500 font-bold rating flex mr-6 self-center items-center ">
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  className="text-black"
                  label={"5 sao"}
                />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <div className="text-yellow-500 font-bold rating flex mr-6 self-center items-center">
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  className="text-black"
                  label={"4 sao"}
                />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <div className="text-yellow-500 font-bold rating flex mr-6 self-center items-center">
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  className="text-black"
                  label={"3 sao"}
                />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
              <div className="text-yellow-500 font-bold rating flex mr-6 self-center items-center">
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  className="text-black"
                  label={"2 sao"}
                />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
              <div className="text-yellow-500 font-bold rating flex mr-6 self-center items-center">
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  className="text-black"
                  label={"1 sao"}
                />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </RadioGroup>
          </FormControl>
          <Box className="flex flex-row items-center">
            <div className="text-yellow-700 px-3">
              <h1 className="font-bold md:text-6xl text-5xl inline">
                {AvgRatingPoint().toFixed(1)}
              </h1>
              <h1 className="text-center">
                ({FilterRatingPoint()?.reduce((sum, i) => sum + i)})
              </h1>
            </div>

            <div className="w-64 py-3">
              <LinearProgress
                className="py-2 my-2"
                variant="buffer"
                valueBuffer={0}
                value={RatioOfRatingPoint(FilterRatingPoint()[0])}
              />
              <LinearProgress
                className="py-2 my-2"
                variant="buffer"
                valueBuffer={0}
                value={RatioOfRatingPoint(FilterRatingPoint()[1])}
              />
              <LinearProgress
                className="py-2 my-2"
                variant="buffer"
                valueBuffer={0}
                value={RatioOfRatingPoint(FilterRatingPoint()[2])}
              />
              <LinearProgress
                className="py-2 my-2"
                variant="buffer"
                valueBuffer={0}
                value={RatioOfRatingPoint(FilterRatingPoint()[3])}
              />
              <LinearProgress
                className="py-2 my-2"
                variant="buffer"
                valueBuffer={0}
                value={RatioOfRatingPoint(FilterRatingPoint()[4])}
              />
            </div>
            <div className="leading-6 text-right px-2">
              <p>{FilterRatingPoint()[0]}</p>
              <p>{FilterRatingPoint()[1]}</p>
              <p>{FilterRatingPoint()[2]}</p>
              <p>{FilterRatingPoint()[3]}</p>
              <p>{FilterRatingPoint()[4]}</p>
            </div>
          </Box>
        </div>
        <Button variant="contained" onClick={handleClickSubmit}>
          Send
        </Button>
      </Box>
    </div>
  );
}
