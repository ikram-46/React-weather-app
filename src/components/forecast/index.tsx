import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chart from "react-apexcharts";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import CardSlider from "../CardSlider";
import "./forecast.css";
import { Box } from "@mui/material";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data, units }) => {
  const symbol = units === "imperial" ? "°F" :"°C";
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  const temp = data.list.map((item)=> {
    return Math.round(item.main.temp_max);
  }).slice(0,5)

  console.log("forecast days", forecastDays, temp);
  return (
    <Container
      sx={{
        marginTop:"5%",

      }}
    >
      <Typography sx={{fontSize:"24px", fontWeight:600}}>Daily</Typography>
      <Accordion allowZeroExpanded>
        <CardSlider dark slides={3} iLn={5}>
        {data.list.splice(0, 5).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">{Math.round(item.main.temp_max)}{symbol} /{Math.round(item.main.temp_min)}{symbol}</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}{symbol}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
        </CardSlider>
      </Accordion>
      <Box sx={{marginTop:"15px"}}>
      <Chart
          type="bar"
          width="100%"
          height="500px"
          series={[
            {
              name: "temperature",
              data: temp,
            },
          ]}
          options={{
            colors: ["#1976d2"],
            theme: { mode: "light" },
            xaxis: {
              tickPlacement: "on",
              categories: forecastDays.slice(0,5),
              title: {
                text: "Weather forecasts for 5 days",
                style: { color: "#212121", fontSize: "110%" },
              },
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "15px", colors: ["#212121"] },
              },
                 title: {
                 text: `Temperature in ${symbol}`,
                 style: { color: "#212121", fontSize: "15px" },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: "15px",
              },
            },
          }}
        />
      </Box>
        
    </Container>
  );
};

export default Forecast;