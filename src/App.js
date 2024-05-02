import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Box, Typography } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((res) => {
        if (res?.status === 200) {
          setData(res?.data);
        }
        setLoading(false);
      })
      ?.catch((err) => setLoading(false));
  }, []);

  const imgFilter = (imgData) => {
    const mobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test(
      navigator.userAgent
    );
    const tablet = /iPad|Android|Windows/i.test(navigator.userAgent);
    if (mobile) {
      return imgData?.medium;
    } else if (tablet) {
      return imgData?.large;
    } else {
      return imgData?.large;
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        p: 3,
        alignItems: "center",
        justifyContent: "center",
        background: "#e7e9dd",
      }}
    >
      {data &&
        data?.results?.map((item) => (
          <Box
            sx={{
              width: "85%",
              border: "1px solid #f2f2f2",
              display: "flex",
              flexWrap: "wrap",
              p: 2,
              borderRadius: "10px",
              gap: 3,
              background: "#fefff0",
              transition: "ease-in-out 300ms",
            }}
            className="box"
          >
            <Box sx={{ p: 1 }}>
              <img
                src={imgFilter(item?.picture)}
                alt={item?.picture?.thumbnail}
                className="image"
                style={{
                  border: "1px solid #999",
                  width: "16rem",
                  transition: "ease-in-out 200ms",
                }}
              />
            </Box>
            <Box sx={{ width: "fit-content", py: 1, px: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
                  {item?.name?.title}. {item?.name?.first} {item?.name?.last}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ whiteSpace: "pre", width: "5rem" }}>
                  Gender :{" "}
                </Typography>
                <Typography>{item?.gender}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ whiteSpace: "pre", width: "5rem" }}>
                  Phone :{" "}
                </Typography>
                <Typography>{item?.cell}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ whiteSpace: "pre", width: "5rem" }}>
                  Email :{" "}
                </Typography>
                <Typography>{item?.email}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ whiteSpace: "pre", width: "5rem" }}>
                  DOB :{" "}
                </Typography>
                <Typography>
                  {item?.dob?.date?.toString()?.split("T")[0]}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ whiteSpace: "pre", width: "5rem" }}>
                  Location :{" "}
                </Typography>
                <Typography>
                  {item?.location?.city}, {item?.location?.state},{" "}
                  {item?.location?.country} {item?.location?.postcode}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default App;
